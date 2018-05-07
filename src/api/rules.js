export const admin = user => user && user.role === 'administrator'

export const all = () => true

export const authenticated = (user) => !!user

export const owner = (user, ownable) => user && user.id === ownable.owner

export const self = (userA, userB) => userA && userB && userA.id === userB.id
