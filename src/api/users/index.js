import {User} from '~/models'
import {getRequestRange} from '~/utils/context'
import {generatePasswordHash} from '~/utils/encryption'
import {assertRightPassword, assertUniqueLogin} from './errors'

export async function resolve (id, context, next) {
  context.target = await User.getById(id)
  if (!context.target) {
    context.status = 404
  } else {
    await next()
  }
}

export async function create (context, next) {
  const userData = context.request.body
  await assertUniqueLogin(userData.login)
  userData.passwordHash = await generatePasswordHash(userData.password)
  context.status = 201
  context.body = await User.create(userData)
}

export async function show (context, next) {
  context.body = context.target
}

export async function showByPage (context, next) {
  const {from, count} = getRequestRange(context.request)
  context.body = await User.getRange(from, count)
}

export async function update (context, next) {
  const userData = context.request.body
  if (userData.password) {
    await assertRightPassword(context.target, userData.oldPassword)
    userData.passwordHash = await generatePasswordHash(userData.password)
  }
  context.body = await User.updateById(context.target.id, userData)
}

export async function destroy (context, next) {
  await User.destroyById(context.target.id)
  context.status = 204
}
