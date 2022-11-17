import { load } from 'ts-dotenv'
import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import thumbsRouter from './routers/thumbsRouter'
import logger from './utils/logger'
import path from 'path'
const app: Application = express()

const env = load({
    PORT: Number,
    ENVIRONMENT: ['production' as const, 'development' as const],
    API_NAME: String,
    BASE_URL: String,
})

const { PORT, ENVIRONMENT, API_NAME, BASE_URL } = env

app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'script-src': [
                    "'self'",
                    "'unsafe-inline'",
                    'https://cdn.jsdelivr.net/',
                    'https://code.jquery.com/',
                ],
            },
        },
    })
)

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.set('views', 'src/views')
app.use(express.json())
app.get('/', logger, (req: Request, res: Response) => {
    res.render('index')
})

app.use('/thumbs', logger, thumbsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
