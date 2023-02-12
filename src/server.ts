import { load } from 'ts-dotenv'
import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import uploadRouter from './routers/uploadRouter'
import logger from './utils/logger'
import path from 'path'
const app: Application = express()

const { PORT, ENVIRONMENT, API_NAME, BASE_URL, OWNER_PATH } = load({
    PORT: Number,
    ENVIRONMENT: ['production' as const, 'development' as const],
    API_NAME: String,
    BASE_URL: String,
    OWNER_PATH: String,
})

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

app.use('/upload', logger, uploadRouter)

app.listen(PORT, () => {
    console.log(
        `Server running ${API_NAME} as ${ENVIRONMENT} on port ${PORT} you can access it at ${BASE_URL}`
    )
})
