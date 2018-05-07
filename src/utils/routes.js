export function registerService (router, route, middlewares) {
  hookRoute(router, 'post', route, middlewares)
}

export function registerCollection (router, name, api) {
  const paramName = `${name.slice(0, -1)}Id`
  const collectionRoute = `/${name}`
  const elementRoute = `${collectionRoute}/:${paramName}`
  hookParam(router, paramName, ...api.resolve)
  hookRoute(router, 'post', collectionRoute, api.create)
  hookRoute(router, 'get', collectionRoute, api.showByPage)
  hookRoute(router, 'get', elementRoute, api.show)
  hookRoute(router, 'patch', elementRoute, api.update)
  hookRoute(router, 'delete', elementRoute, api.destroy)
  return router
}

export function hookParam (router, name, resolve) {
  resolve && router.param(name, resolve)
}

export function hookRoute (router, method, route, middlewares) {
  middlewares && router[method](route, ...middlewares)
}
