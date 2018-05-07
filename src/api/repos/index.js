import {Repository} from '@/models'
import {getRequestRange} from '@/utils/context'

export async function resolve (id, context, next) {
  context.target = await Repository.getById(id)
  if (!context.target) {
    context.status = 404
  } else {
    await next()
  }
}

export async function create (context, next) {
  const repoData = context.request.body
  repoData.owner = context.user.id
  context.status = 201
  context.body = await Repository.create(repoData)
}

export async function show (context, next) {
  context.body = context.target
}

export async function showByPage (context, next) {
  const {from, count} = getRequestRange(context.request)
  context.body = await Repository.getRange(from, count)
}

export async function update (context, next) {
  const repoData = context.request.body
  context.body = await Repository.updateById(context.target.id, repoData)
}

export async function destroy (context, next) {
  await Repository.destroyById(context.target.id)
  context.status = 204
}
