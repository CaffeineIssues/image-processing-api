import { load } from 'ts-dotenv'
import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import thumbsRouter from './routers/thumbsRouter'
import logger from './utils/logger'
const app: Application = express()

const env = load({
    PORT: Number,
    ENVIRONMENT: ['production' as const, 'development' as const],
    API_NAME: String,
    BASE_URL: String,
})

const { PORT, ENVIRONMENT, API_NAME, BASE_URL } = env
app.use(helmet())
app.use(express.json())
app.get('/', logger, (req: Request, res: Response) => {
    res.send('api running')
})

app.use('/thumbs', logger, thumbsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
