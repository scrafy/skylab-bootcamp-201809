const logic = require('./logic')

const { expect } = require('chai')

const flag = true

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    _users=[]
    describe('users', () => {
        flag & describe('registerUser', () => {
            
            it('should succeed on correct data', () =>{
                expect(logic.registerUser('John', 'Doe', 'jd', '123')).to.be.true
            })

            it('should fail on invalid name (number)', ()=>{

                try{logic.registerUser(123, 'Doe', 'jd', '123')}
                    catch(error) {
                        expect(error).not.to.be.undefined
                        expect(error.toString()).to.equal(`TypeError: 123 is not a string`)
                    }                
            })

            it('should fail on invalid name (undefined)', ()=>{

                try{logic.registerUser(undefined, 'Doe', 'jd', '123')}
                    catch(error) {
                        expect(error).not.to.be.undefined
                        expect(error.toString()).to.equal(`TypeError: undefined is not a string`)
                    }                
            })

            it('should fail on empty name', ()=>{

                try{logic.registerUser('  ', 'Doe', 'jd', '123')}
                    catch(error) {
                        expect(error).not.to.be.undefined
                        expect(error.toString()).to.equal(`Error: name is empty or blank`)
                    }                
            })
            
        })
    })

})