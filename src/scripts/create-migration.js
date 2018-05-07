import fs from 'fs'
import path from 'path'
import moment from 'moment'

const MIGRATIONS_FOLDER = path.join('src', 'migrations')

/**
 * Usage:
 *   yarn run create:migration <name>
 */

function createMigration (name) {
  const template = path.join(__dirname, 'migration.default.sql')
  const migration = `${moment().format('YYYYMMDDHHmmss')}-${name}`
  const output = path.join(MIGRATIONS_FOLDER, `${migration}.sql`)
  fs.createReadStream(template).pipe(fs.createWriteStream(output))
  return migration
}

const migration = createMigration(process.argv[2])
console.log(`Migration "${migration}" created.`)
