import express from 'express'

const logger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const url = req.originalUrl
    console.log(
        `${req.method} ${url} was called at ${new Date().toISOString()}`
    )
    next()
}
export default logger
