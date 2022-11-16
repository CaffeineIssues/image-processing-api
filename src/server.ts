import { load } from 'ts-dotenv'
import express, { Application, Request, Response } from 'express'
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const myFunc = (num: number): number => {
    return num * num
}

export default myFunc
