import { check } from 'express-validator'

export const userRegisterValidator = [
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('Le champ prénom est requis'),

    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Le champ nom est requis'),

    check('email')
        .isEmail()
        .withMessage('Veuillez entrer une adresse e-mail valide'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Votre mot de passe doit avoir au moins 6 caractères')
]