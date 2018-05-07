export function getRequestRange (request, perPage = 20) {
  const page = parseInt(request.query.page) || 1
  const offset = (page - 1) * perPage
  return {from: offset, count: perPage}
}
