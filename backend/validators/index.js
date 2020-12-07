import { validationResult } from 'express-validator'

export const runValidation = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        const extractedErrors = {}

        // errors.array().forEach(error => {
        //     if (!extractedErrors[error.param])
        //         extractedErrors[error.param] = [];
        //     extractedErrors[error.param].push(error.msg);
        // });

        errors.array().forEach(error => {
            if (!extractedErrors[error.param])
                extractedErrors[error.param] = error.msg
        });

        return res.status(422).json({
            // message: errors.array()[0].msg
            message: extractedErrors
        })
    }
    next()
}