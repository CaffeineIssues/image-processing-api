import { load } from 'ts-dotenv'
import express, { Application, Request, Response } from 'express'
import thumbsRouter from './routers/thumbsRouter'
const app: Application = express()

const env = load({
    PORT: Number,
    ENVIRONMENT: ['production' as const, 'development' as const],
    API_NAME: String,
    BASE_URL: String,
})

const { PORT, ENVIRONMENT, API_NAME, BASE_URL } = env

app.get('/', (req: Request, res: Response) => {
    res.send('api running')
})

app.use('/thumbs', thumbsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
