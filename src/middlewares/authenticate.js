import BadRequestException from '~/exceptions/BadRequestException'
import {User} from '~/models'
import {__} from '~/utils/text'

export default async function (context, next) {
  const token = getAuthToken(context)
  context.user = token ? await User.getByToken(token) : null
  context.token = token
  await next()
}

function getAuthToken (context) {
  const authorization = context.request.headers['authorization']
  if (!authorization) {
    return null
  }
  const pattern = /^\s*([^\s]+)\s+(.+?)\s*$/
  const [, type, token] = authorization.match(pattern) || []
  if (!type || !token || type !== 'Token') {
    throw new BadRequestException(__`The Authorization header content could not
      be recognized. It is either malformed of not supported by this
      application. Expected content in the shape of \`Token <value>\`.`)
  }
  return token
}
