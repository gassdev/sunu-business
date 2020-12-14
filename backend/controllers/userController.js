import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import _ from 'lodash'
import smtpTransport from 'nodemailer-smtp-transport'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @desc    Get a new user information and send email confirmation
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Utilisateur avec cet email existe déjà.')
    }

    const transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    }))

    const token = jwt.sign({ firstName, lastName, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' })

    if (token) {
        const emailData = {
            from: `SunuBusiness <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: `Lien d'activation du compte`,
            html: `
        <h1>Confirmez votre email</h1>
        <p>Veuillez suivre ce lien pour activer votre compte</p>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr/>
        <small>Cet email peut contenir des informations sensibles, veuillez ne pas le partager</p>
        <br/>
        <small>${process.env.CLIENT_URL}</small> 
        `
        }

        const sent = await transporter.sendMail(emailData)

        if (sent) {
            // console.log('SIGNUP EMAIL SENT ', sent)
            // return res.json({
            //     message: `Un e-mail de confirmation vous a été envoyé.`
            // })
            return res.send('Un e-mail de confirmation vous a été envoyé')
        }
    }

})



// @desc    Activate user account
// @route   POST /api/users/activate-account
// @access  Public
const activateAccount = asyncHandler(async (req, res) => {
    const { token } = req.body

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION)
        // console.log(decoded)
        if (decoded) {
            const { firstName, lastName, email, password } = jwt.decode(token)

            const userExists = await User.findOne({ email })

            if (userExists) {
                res.status(400)
                throw new Error('Cet email est déjà confirmé.')
            }

            const user = await User.create({
                firstName,
                lastName,
                email,
                password
            })

            if (user) {
                res.status(201)
                res.json({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                })
            }
        }
    }
})




// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Email et/ou mot de passe invalide(s)')
    }
})







// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('Utilisateur non trouvé.')
    }


})



// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updateUserProfile.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('Utilisateur non trouvé.')
    }


})


// @desc Forgot user password
// @route PUT /api/users/forgot-password
// @access Public
const forgotPassword = (req, res) => {
    const { email } = req.body

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "L'utilisateur avec cet e-mail n'existe pas"
            })
        }

        const transporter = nodemailer.createTransport(smtpTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        }))

        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' })

        const emailData = {
            from: `Application <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: `Réinitialisation de mot de passe`,
            html: `
            <h1>Réinitialiser votre mot de passe</h1>
            <p>Veuillez cliquer le lien suivant pour réinitialiser votre mot de passe</p>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            <hr/>
            <small>Cet email peut contenir des informations sensibles, veuillez ne pas le partager</p>
            <br/>
            <small>${process.env.CLIENT_URL}</small> 
            `
        }

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                console.log('RESET PASSWORD LINK ERROR', err)
                return res.status(400).json({
                    error: 'Database connection error on user password forgot request'
                })
            } else {
                // sending the email.
                transporter.sendMail(emailData)
                    .then(sent => {
                        // console.log('SIGNUP EMAIL SENT ', sent)
                        return res.json({
                            message: `Un e-mail vous a été envoyé. Suivez les instructions pour réinitialiser votre mot de passe`
                        })
                    })
                    .catch(err => {
                        // console.log('SIGNUP EMAIL SENT ERROR ', err)
                        return res.json({
                            message: err.message
                        })
                    })
            }
        })



    })


}


// @desc Reset user password
// @route PUT /api/users/reset-password
// @access Public
const resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    error: 'Lien expiré: Veuillez réessayer'
                })
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Something went wrong. Try later'
                    })
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                }

                user = _.extend(user, updatedFields)

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error resetting user password'
                        })
                    }
                    res.json({
                        message: `Génial! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe`
                    })
                })
            })
        })
    }
}


export {
    authUser,
    getUserProfile,
    registerUser,
    activateAccount,
    forgotPassword,
    resetPassword,
    updateUserProfile,
}