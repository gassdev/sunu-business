const notFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} non trouvé`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message === "jwt expired" ? "Lien expiré; veuillez créer un compte à nouveau" : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }