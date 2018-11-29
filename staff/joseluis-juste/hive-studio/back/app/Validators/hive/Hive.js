const ValidationException = use('App/Exceptions/ValidationException')

'use strict'

class Hive {

  
  get rules() {

    const { mintemperature, minhumidity, beeminvolume } = this.ctx.request.body
    
    return {

      name: `required`,
      description: 'required',
      mintemperature:`required|number|range:0,101`,
      maxtemperature:`required|number|range:0,101|superiorToOrEqual:${mintemperature}`,
      minhumidity:`required|number|range:0,101`,
      maxhumidity:`required|number|range:0,101|superiorToOrEqual:${minhumidity}`,
      beeminvolume:`required|number|range:9999,100001`,
      beemaxvolume:`required|number|range:9999,100001|superiorToOrEqual:${beeminvolume}`,
      latitude: `required|number`,
      longitude: `required|number`
    
    }
  }
  

  get messages() {
    return {
      'name.required': 'The name field is required',
      'description.required': 'The description field is required',
      'mintemperature.required': 'The mintemperature field is required',
      'mintemperature.number': 'The mintemperature field is not a number',
      'mintemperature.range': 'The mintemperature field has to be between 1-100 range',
      'maxtemperature.required': 'The maxtemperature field is required',
      'maxtemperature.number': 'The maxtemperature field is not a number',
      'maxtemperature.range': 'The maxtemperature field has to be between 1-100 range',
      'maxtemperature.superiorToOrEqual': 'The maxtemperature field has to greather than mintemperature field',
      'minhumidity.required': 'The minhumidity field is required',
      'minhumidity.number': 'The minhumidity field is not a number',
      'minhumidity.range': 'The minhumidity field has to be between 1-100 range',
      'maxhumidity.required': 'The maxhumidity field is required',
      'maxhumidity.number': 'The maxhumidity field is not a number',
      'maxhumidity.range': 'The maxhumidity field has to be between 1-100 range',
      'maxhumidity.superiorToOrEqual': 'The maxhumidity field has to greather than minhumidity field',
      'beeminvolume.required': 'The beeminvolume field is required',
      'beeminvolume.number': 'The beeminvolume field is not a number',
      'beeminvolume.range': 'The beeminvolume field has to be between 1-100 range',
      'beemaxvolume.required': 'The beemaxvolume field is required',
      'beemaxvolume.number': 'The beemaxvolume field is not a number',
      'beemaxvolume.range': 'The beemaxvolume field has to be between 1-100 range',
      'beemaxvolume.superiorToOrEqual': 'The beemaxvolume field has to greather than beeminvolume field',
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

module.exports = Hive
