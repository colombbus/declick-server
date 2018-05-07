import BadRequestException from '@/exceptions/BadRequestException'
import ConflictException from '@/exceptions/ConflictException'
import ForbiddenException from '@/exceptions/ForbiddenException'
import NotFoundException from '@/exceptions/NotFoundException'
import UnauthorizedException from '@/exceptions/UnauthorizedException'
import ValidationException from '@/exceptions/ValidationException'

export default async function (context, next) {
  try {
    await next()
    const status = context.response.status || 404
    if (status === 404) {
      throw new NotFoundException()
    }
  } catch (exception) {
    if (exception instanceof BadRequestException) {
      context.status = 400
      context.body = exception.toJson()
    } else if (exception instanceof UnauthorizedException) {
      context.status = 401
      context.body = exception.toJson()
    } else if (
      exception instanceof ValidationException ||
      exception instanceof ForbiddenException
    ) {
      context.status = 403
      context.body = exception.toJson()
    } else if (exception instanceof NotFoundException) {
      context.status = 404
      context.body = exception.toJson()
    } else if (exception instanceof ConflictException) {
      context.status = 409
      context.body = exception.toJson()
    } else {
      context.status = 500
      context.body = ''
      console.error(exception)
    }
  }
}
