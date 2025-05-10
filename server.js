import { createServer } from 'https'
import { parse } from 'url'
import next from 'next'
import fs from 'fs'

const port = parseInt(process.env.PORT || '3000', 10)
const app = next({ experimentalHttpsServer: true})
const handle = app.getRequestHandler()
const httpsOptions = {
    key: fs.readFileSync('./certs/cert.key'),
    cert: fs.readFileSync('./certs/cert.crt'),
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port)

    console.log(
        `> Server listening at https://localhost:${port}`
    )
})