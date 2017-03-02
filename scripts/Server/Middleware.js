import Response from './Response'

export const headerMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}

export const createResponseMiddleware = (context) => {
  return (req, res, next) => {
    Object.assign(context, {
      response: new Response(res)
    })
    next()
  }
}
