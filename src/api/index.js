import Router from 'koa-router'
import {registerApi} from '~/utils/api'
import * as context from './rules'

const router = Router()

registerApi(router, [__dirname, 'users'], context)

/*
const authApi = loadApi(__dirname, 'auth', context)
const filesApi = loadApi(__dirname, 'files', context)
const reposApi = loadApi(__dirname, 'repos', context)
const usersApi = loadApi(__dirname, 'users', context)

registerService(router, '/auth/logIn', authApi.logIn)
registerService(router, '/auth/logOut', authApi.logOut)
registerCollection(router, 'files', filesApi)
hookRoute(router, 'get', '/files/:fileId/:fileName', filesApi.showContent)
registerCollection(router, 'repos', reposApi)
registerCollection(router, 'users', usersApi)
*/

export default router
