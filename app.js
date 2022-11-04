import { createServer } from 'node:http'
import { create, find, remove } from './functions/api/todos.js'

createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = new URL(req.url, `http://${req.headers.host}`)

    const endPoint = `${req.method}:${url.pathname}`
    let results = undefined

    switch (endPoint) {
        case 'GET:/todos':
            results = await find()
            break;
        case 'POST:/todos':
            results = await create(req)
            break;
        case 'DELETE:/todos':
            results = await remove(res, url)
            break;
        default:
            res.writeHead(404)
            break;
    }

    if (results) {
        res.write(JSON.stringify(results))
    }

    res.end()
}).listen(3000)