const ValidationException = use('App/Exceptions/ValidationException')

'use strict'

class UpdateUser {

  
  get rules() {

    const userId = this.ctx.request.user.id
    const { confirmpassword } = this.ctx.request.body
    return {

      name: 'required',
      surname: 'required',
      email: `required|email|unique:users,email,id,${userId}`,
      phone: 'required',
      username: `required|unique:users,username,id,${userId}`,
      password: `required|password_correct:users,password,${userId}`,
      newpassword: `required|equal_to:${confirmpassword}`,
      confirmpassword: `required`

    }

  }

  get messages() {
    return {
      'name.required': 'The name field is required',
      'surname.required': 'The surname field is required',
      'email.required': 'The email field is required',
      'email.unique': 'Email address in use',
      'email.email': 'Email address has not a correct format',
      'phone.required': 'The phone field is required',
      'username.required': 'The username field is required',
      'username.unique': 'Exists an user with the same username',
      'password.required': `The password field is required`,
      'password.password_correct': `The user´s password is incorrect`,
      'newpassword.required': 'The newpassword is required',
      'newpassword.equal_to': 'The newpassword does not match with confirmpassword value',
      'confirmpassword.required': 'The confirmpassword is required'
    }
  }

  get validateAll() {
    return true
  }

  async authorize() {

    return true
  }

  /*
    get sanitizationRules () {
      return {
        email: 'normalize_email',
        age: 'to_int'
      }
    }*/

  async fails(errorMessages) {


    throw new ValidationException("Exists validation errors", 422, errorMessages)

  }

}

module.exports = UpdateUser
