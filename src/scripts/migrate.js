import fs from 'fs'
import path from 'path'
import ora from 'ora'
import {loadSqlModule} from '@/utils/sql'
import {__} from '@/utils/text'

const MIGRATIONS_FOLDER = path.join('src', 'migrations')
const Migration = loadSqlModule(__dirname, 'Migration')

/**
 * Usage:
 *   yarn run migrate
 *   yarn run migrate up [<count> | <name>]
 *   yarn run migrate down [<count> | <name>] [--force]
 */

async function migrate () {
  await Migration.createTable()
  const parameters = process.argv.slice(2)
  const [migrations, task, options] = await interpretCommand(parameters)
  for (const migration of migrations) {
    await task(migration, options)
  }
  if (migrations.length === 0) {
    console.log('Nothing to migrate.')
  }
}

async function interpretCommand (params) {
  const [operator, operand] = removeOptionParams(params)
  const transform = getListTransform(operand)
  if (operator === 'up') {
    return [transform((await listNotDoneMigrations())), applyMigration]
  } else if (operator === 'down') {
    const force = params.includes('--force')
    const migrations = transform((await listDoneMigrations()).reverse())
    return [migrations, revertMigration, {force}]
  } else {
    return [await listNotDoneMigrations(), applyMigration]
  }
}

function removeOptionParams (params) {
  return params.filter(param => param[0] !== '-')
}

function getListTransform (param) {
  if (!param) {
    return list => list
  } else if (/^\d+$/.test(param)) {
    return list => list.slice(0, param)
  } else {
    const findFirstMatch = list =>
      list.findIndex(element => element.includes(param))
    return list => list.slice(0, findFirstMatch(list) + 1)
  }
}

async function applyMigration (migration) {
  const loader = createLoader(`Applying migration "${migration}"...`)
  try {
    await loadMigrationModule(migration).up()
    await Migration.log(migration)
    loader.succeed(`Migration "${migration}" applied.`)
  } catch (error) {
    loader.fail()
    throw error
  }
}

async function revertMigration (migration, {force}) {
  const loader = createLoader(`Reverting migration "${migration}"...`)
  try {
    await loadMigrationModule(migration).down()
    await Migration.unlog(migration)
    loader.succeed(`Migration "${migration}" reverted.`)
  } catch (error) {
    if (force) {
      await Migration.unlog(migration)
      loader.warn(`Migration "${migration}" ignored.`)
    } else {
      loader.fail()
      console.error(error)
      console.error(__`An error occured while processing migration
        "${migration}".`)
      console.error(`Use --force option to ignore this error.`)
      process.exit(1)
    }
  }
}

function createLoader (text) {
  return ora({
    text,
    spinner: 'line',
    color: 'grey'
  }).start()
}

function listAllMigrations () {
  return fs.readdirSync(MIGRATIONS_FOLDER)
    .filter(file => fs.lstatSync(path.join(MIGRATIONS_FOLDER, file)).isFile())
    .filter(file => path.extname(file) === '.sql')
    .map(file => path.basename(file, '.sql'))
    .sort()
}

async function listNotDoneMigrations () {
  const allMigrations = listAllMigrations()
  const [lastDoneMigration] = (await listDoneMigrations()).slice(-1)
  return lastDoneMigration
    ? allMigrations.filter(migration => migration > lastDoneMigration)
    : allMigrations
}

async function listDoneMigrations () {
  return (await Migration.getAll()).map(row => row.name).sort()
}

function loadMigrationModule (name) {
  return loadSqlModule(MIGRATIONS_FOLDER, name)
}

migrate()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
