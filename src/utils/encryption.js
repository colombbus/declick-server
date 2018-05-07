import bcrypt from 'bcrypt'

export async function generatePasswordHash (password) {
  return bcrypt.hash(password, await bcrypt.genSalt())
}

export async function testPassword (password, passwordHash) {
  return bcrypt.compare(password, passwordHash)
}
