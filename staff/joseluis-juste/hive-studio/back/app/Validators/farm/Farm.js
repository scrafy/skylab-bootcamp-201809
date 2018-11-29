const ValidationException = use('App/Exceptions/ValidationException')

'use strict'

class Farm {

  
  get rules() {

    const { minhives } = this.ctx.request.body
    
    return {

      name: `required`,
      description: 'required',
      maxhives: `required|number|range:0,101`,
      squaremeters: `required|number`
    
    }
  }
  

  get messages() {
    return {
      'name.required': 'The name field is required',
      'description.required': 'The description field is required',
      'maxhives.required': 'The maxhives field is required',
      'maxhives.number': 'The maxhives field is not a number',
      'maxhives.range': 'The maxhives field has to be between 1-100 range',
      'squaremeters.required': 'The squaremeters field is required',
      'squaremeters.number': 'The squaremeters field is not a number'
      
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

module.exports = Farm
