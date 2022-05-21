const SingupController = require('./signup')
const { MissingParamError, InvalidParamError, ServerError } = require('../../errors')
// const { okCreated } = require('../../helpers/http/http-helper')

const makeFakeRequest = () => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = () => ({
  id: 'valid_id'
})

// const makeFakeReturn = () => ({
//   name: 'any_name',
//   token: 'any_token',
//   refreshToken: 'any_refreshToken'
// })

const makeEmailValidatorStub = () => {
  class EmailValidatorStub {
    isValid (email) {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeAccountServiceStub = () => {
  class AccountStub {
    async add ({ name, email, password }) {
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
  }

  return new AuthenticationService()
}

const makeSut = () => {
  const emailValidatorStub = makeEmailValidatorStub()
  const accountServiceStub = makeAccountServiceStub()
  const authenticationServiceStub = makeAuthenticationServiceStub()
  const sut = new SingupController(emailValidatorStub, accountServiceStub, authenticationServiceStub)
  return {
    sut,
    emailValidatorStub,
    accountServiceStub,
    authenticationServiceStub
  }
}

describe('Signup Controller', () => {
  test('Should returns 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should returns 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
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
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should returns 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should returns 400 if the passwords are not equal', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'another_any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should returns 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should returns 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call EmailValidator with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should call AddAccountService with correct values', async () => {
    const { sut, accountServiceStub } = makeSut()
    const addSpy = jest.spyOn(accountServiceStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should returns 500 if AddAccountService throws', async () => {
    const { sut, accountServiceStub } = makeSut()
    jest.spyOn(accountServiceStub, 'add').mockImplementationOnce(() => {
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

  // test('Should returns 201 if an valid data is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(okCreated(makeFakeReturn()))
  // })
})
