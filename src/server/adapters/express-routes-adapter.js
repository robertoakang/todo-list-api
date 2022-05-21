const adaptRoute = (controller, handler) => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body
    }
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
