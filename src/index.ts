import express from 'express'
import cors from 'cors'
import { router } from './router'
import { enviroments } from './helpers/enviroments'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

const port = enviroments.port

app.listen(port, () => console.log(`Running on port ${port}...`))