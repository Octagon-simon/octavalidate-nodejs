//make sure to import the module correctly, the import statement below will not work as expected because the package.json file is not configured to ES modules

import Octavalidate, { ValidationRules } from "../..";

//@ts-ignore - Don't add this ignore to your project
const octavalidate = new Octavalidate("test");

//destructure methods from the instance
const { createValidator, getError, getErrors, validate } = octavalidate

//define validation rules
const rules: ValidationRules = {
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
        minLength: 8,//make sure to import the module correctly
        errorMessage: {
            required: "Password is required",
            minLength: "Password should be at least 8 characters long"
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
    //get all errors
    // console.log("Errors:", getErrors())
}
