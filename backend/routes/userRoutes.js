import express from 'express'
const router = express.Router()
import {
    activateAccount,
    authUser,
    forgotPassword,
    getUserProfile,
    registerUser,
    resetPassword,
    updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { forgotPasswordValidator, resetPasswordValidator, userRegisterValidator } from '../validators/userValidator.js'
import { runValidation } from '../validators/index.js'

router
    .route('/')
    .post(userRegisterValidator, runValidation, registerUser)

router.post('/activate-account', activateAccount)

router.post('/login', authUser)

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)


export default router