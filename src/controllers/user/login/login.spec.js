const LoginController = require('./login')
const { MissingParamError, ServerError, Unauthorized } = require('../../../errors')
const { unauthorized, ok } = require('../../../helpers/http/http-helper')

const makeFakeRequest = () => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeFakeAccount = () => ({
  id: 'valid_id',
  name: 'any_name'
})

const makeFakeReturn = () => ({
  name: 'any_name',
  token: 'any_token',
  refreshToken: 'any_refreshToken'
})

const makeAccountServiceStub = () => {
  class AccountStub {
    async findUserByEmail (email, password) {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new AccountStub()
}

const makeAuthenticationServiceStub = () => {
  class AuthenticationService {
    generateTokens ({ payload }) {
      return {
        token: 'any_token',
        refreshToken: 'any_refreshToken'
      }
    }

    verifyRefresh (payload, refreshToken) {
      return true
    }
  }

  return new AuthenticationService()
}

const makeSut = () => {
  const accountServiceStub = makeAccountServiceStub()
  const authenticationServiceStub = makeAuthenticationServiceStub()
  const sut = new LoginController(accountServiceStub, authenticationServiceStub)
  return {
    sut,
    accountServiceStub,
    authenticationServiceStub
  }
}

describe('Login Controller', () => {
  test('Should returns 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should returns 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should call FindUserByEmailAccountService with correct values', async () => {
    const { sut, accountServiceStub } = makeSut()
    const findUserByEmailSpy = jest.spyOn(accountServiceStub, 'findUserByEmail')
    await sut.handle(makeFakeRequest())
    expect(findUserByEmailSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should returns 500 if FindUserByEmailAccountService throws', async () => {
    const { sut, accountServiceStub } = makeSut()
    jest.spyOn(accountServiceStub, 'findUserByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AuthenticationService with correct values', async () => {
    const { sut, authenticationServiceStub } = makeSut()
    const addSpy = jest.spyOn(authenticationServiceStub, 'generateTokens')
    await sut.handle(makeFakeRequest())
    const payload = {
      id: 'valid_id',
      name: 'any_name',
      email: 'any_email@mail.com'
    }
    expect(addSpy).toHaveBeenCalledWith(payload)
  })

  test('Should returns 500 if AuthenticationService throws', async () => {
    const { sut, authenticationServiceStub } = makeSut()
    jest.spyOn(authenticationServiceStub, 'generateTokens').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, accountServiceStub } = makeSut()
    jest.spyOn(accountServiceStub, 'findUserByEmail').mockReturnValueOnce(new Promise(resolve => resolve(false)))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should returns 200 if an valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeReturn()))
  })

  test('Should returns 400 if no payload is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        refreshToken: 'any_refresh_token'
      }
    }
    const httpResponse = await sut.handleRefreshToken(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('payload'))
  })

  test('Should returns 400 if no refreshToken is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        payload: {
          id: 'valid_id',
          name: 'any_name',
          email: 'any_email@mail.com'
        }
      }
    }
    const httpResponse = await sut.handleRefreshToken(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('refreshToken'))
  })

  test('Should returns 401 if refreshToken is invalid', async () => {
    const { sut, authenticationServiceStub } = makeSut()
    jest.spyOn(authenticationServiceStub, 'verifyRefresh').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        payload: {
          id: 'valid_id',
          name: 'any_name',
          email: 'any_email@mail.com'
        },
        refreshToken: 'any_refresh_token'
      }
    }
    const httpResponse = await sut.handleRefreshToken(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new Unauthorized())
  })

  test('Should returns 500 if throws', async () => {
    const { sut, authenticationServiceStub } = makeSut()
    jest.spyOn(authenticationServiceStub, 'verifyRefresh').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        payload: {
          id: 'valid_id',
          name: 'any_name',
          email: 'any_email@mail.com'
        },
        refreshToken: 'any_refresh_token'
      }
    }

    const httpResponse = await sut.handleRefreshToken(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should returns 200 if an valid data is provided to handleRefreshToken', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        payload: {
          id: 'valid_id',
          name: 'any_name',
          email: 'any_email@mail.com'
        },
        refreshToken: 'any_refresh_token'
      }
    }
    const httpResponse = await sut.handleRefreshToken(httpRequest)
    expect(httpResponse).toEqual(ok({
      token: 'any_token',
      payload: {
        id: 'valid_id',
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }))
  })
})
