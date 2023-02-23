import { load } from 'ts-dotenv'
import express, { Application, Request, Response } from 'express'

import helmet from 'helmet'
import logger from './utils/logger'
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
const upload = multer()
import { v4 as uuidv4 } from 'uuid'
const app: Application = express()

import uploadRouter from './routers/uploadRouter'
import thumbsRouter from './routers/thumbsRouter'

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
                    'http://localhost:3000/',
                ],
                'script-src-attr': ["'self'", "'unsafe-inline'"],
            },
        },
    })
)

app.use(
    bodyParser.json({
        limit: '50mb',
    })
)
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
    })
)
app.use(upload.any())
app.use(express.static(path.join(__dirname, 'public')))

//ejs views
app.set('view engine', 'ejs')

app.set('views', 'src/views')
app.use(express.json())
app.get('/', logger, (req: Request, res: Response) => {
    res.render('index')
})
app.get('/home', logger, (req: Request, res: Response) => {
    res.render('pages/home', { ownerId: uuidv4() })
})
app.get('/documentation', logger, (req: Request, res: Response) => {
    res.render('pages/documentation')
})
app.get('/about', logger, (req: Request, res: Response) => {
    res.render('pages/about')
})

//routes
app.use('/upload', logger, uploadRouter)
app.use('/thumbs', logger, thumbsRouter)

app.listen(PORT, () => {
    console.log(
        `Server running ${API_NAME} as ${ENVIRONMENT} on port ${PORT} you can access it at ${BASE_URL}`
    )
})
