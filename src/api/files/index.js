import {Repository} from '@/models'

export async function resolve (id, context, next) {
  context.target = await Repository.getById(id)
  if (!context.target) {
    context.status = 404
  } else {
    await next()
  }
}

export async function show (context, next) {
  context.body = context.target
}
