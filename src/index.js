import dotenv from 'dotenv'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from '~/api'
import authenticate from '~/middlewares/authenticate'
import errorHandler from '~/middlewares/errorHandler'

dotenv.config()

const application = new Koa()
const port = process.env.SERVER_PORT

application.use(bodyParser({enableTypes: ['json']}))
application.use(errorHandler)
application.use(authenticate)
application.use(router.routes())
application.use(router.allowedMethods())

application.listen(port)

console.log(`Server started on port ${port}.`)
