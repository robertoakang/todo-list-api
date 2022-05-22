const adaptRoute = (controller, handler) => {
  return async (req, res) => {
    let httpRequest = {
      body: req.body
    }
    if (req.user) httpRequest = { ...httpRequest, user: req.user }
    if (req.params) httpRequest = { ...httpRequest, params: req.params }
    const httpResponse = await controller[handler](httpRequest)
    if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}

module.exports = adaptRoute
