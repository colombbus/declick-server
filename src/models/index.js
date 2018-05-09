import loadPgModule from 'node-pg-module'

export const User = loadPgModule([__dirname, 'User.sql'])
