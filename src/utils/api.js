import fs from 'fs'
import path from 'path'
import {makePolicy} from '@/middlewares/policy'
import {makeValidator} from '@/middlewares/validator'
import {makeViewer} from '@/middlewares/viewer'
import {parseConfig} from '@/utils/config'

export function registerApi (router, dir, context) {
  if (Array.isArray(dir)) {
    dir = path.join(...dir)
  }
  const requests = loadApi(dir, context)
  requests.forEach(request => {
    router[request.method](request.path, ...request.middlewares)
  })
}

function loadApi (dir, context) {
  const modulePath = path.join(dir)
  const configPath = path.join(dir, 'config.yml')
  const module = require(modulePath)
  const config = parseConfig(fs.readFileSync(configPath), context)
  const requests = readRequests(config)
  return attachModule(requests, module)
}

function readRequests (config) {
  return Object.entries(config.requests)
    .reduce((requests, [name, reqConfig]) => {
      const route = parseRoute(reqConfig.route)
      requests.push({
        method: route.method,
        path: route.path,
        validator: readValidator(reqConfig.fields)
        policy: readPolicy(reqConfig.access)
        viewer: readViewer(reqConfig.output)
      })
      return requests
    })
}

function attachModule (requests, module) {
  requests.forEach(requests => {
    const task = module[requests.name]
    task && requests.middlewares.push(task)
  })
  return requests
}

function parseRoute (config) {
  const [method, path] = config.split(/\s+/, 2)
  return {method, path}
}

function getValidator(config, name) {
  const fields = config.requests[name].fields || []
  return makeValidator(fields.reduce((format, fieldRef) => {
    const optional = fieldRef.endsWith('?')
    const field = optional ? fieldRef.slice(0, -1) : fieldRef
    const fieldFormat = config.fields[field]
    format[field] = optional ? {...fieldFormat, required: false} : fieldFormat
    return format
  }, {}))
}

function getPolicy (config, name) {
  const access = config.requests[name].access || (() => false)
  return makePolicy(access)
}

function getViewer (config, name) {
  const output = config.requests[name].output
  if (output === 'binary') {
    return
  }
  const asList = output && output.slice(-2) === '[]'
  const viewName = output && asList ? output.slice(0, -2) : output
  const viewConfig = viewName ? config.views[viewName] : null
  return makeViewer(viewConfig, asList)
}
