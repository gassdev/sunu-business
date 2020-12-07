import express from 'express'
const router = express.Router()
import {
    activateAccount,
    authUser,
    getUserProfile,
    registerUser,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { userRegisterValidator } from '../validators/userValidator.js'
import { runValidation } from '../validators/index.js'

router
    .route('/')
    .post(userRegisterValidator, runValidation, registerUser)

router.post('/activate-account', activateAccount)

router.post('/login', authUser)

router
    .route('/profile')
    .get(protect, getUserProfile)

export default router