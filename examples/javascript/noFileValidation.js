//make sure to import the module correctly
const Octavalidate = require('../../index.js');

//create a new instance of the function
const octavalidate = new Octavalidate('test')

//destructure methods from the instance
const { createValidator, getError, getErrors, validate } = octavalidate

//define validation rules
const rules = {
    userName: {
        required: true,
        pattern: /^[a-zA-Z]+$/,
        errorMessage: {
            pattern: "Username should only contain letters",
            required: "Username is required"
        }
    },
    password: {
        required: true,
        minLength: 8,
        ruleTitle: 'strongPassword',
        errorMessage: {
            required: "Password is required",
            minLength: "Password should be at least 8 characters long",
            ruleTitle: "Password is not strong enough",
        }
    }
}

//create validator by assigning the rules
createValidator(rules)

//Now here's a sample payload
const fakeRequestBody = {
    userName: "JohnDoe123",
    password: "StrongPass123!"
}

//validate the payload
if (validate(fakeRequestBody) === true) {
    console.info("Payload is valid")
} else {
    console.info("Payload is invalid")
    //get the error
    console.error("Error:", getError())
}
