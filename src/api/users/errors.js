import ConflictException from '~/exceptions/ConflictException'
import ForbiddenException from '~/exceptions/ForbiddenException'
import {User} from '~/models'
import {testPassword} from '~/utils/encryption'
import {__} from '~/utils/text'

export async function assertUniqueLogin (login) {
  if (await User.existsByLogin(login)) {
    throw new ConflictException(`A user already exists with login $login.`)
  }
}

export async function assertRightPassword (user, password) {
  if (!await testPassword(password, user.passwordHash)) {
    throw new ForbiddenException(__`The provided password doesn't match the
      stored one.`)
  }
}
