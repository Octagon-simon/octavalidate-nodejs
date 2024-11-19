//make sure to import the module correctly, the import statement below will not work as expected because the package.json file is not configured to ES modules
import Octavalidate, { ValidationRules } from "../../";

//@ts-ignore - Don't add this ignore to your project
const octavalidate = new Octavalidate("test");

//destructure methods from the instance
const { createValidator, getError, getErrors, validate } = octavalidate

//define validation rules
const rules: ValidationRules = {
    profile: {
        required: true,
        type: "file", //this is required for file validation
        maxFileSize: "1mb",
        mimeType: "image/png, image/jpeg", //or you can use a wildcard here
        errorMessage: {
            required: "Profile is required",
            type: "You have uploaded an invalid file",
            maxFileSize: "Your profile should not exceed 1MB",
            mimeType: "File type is not supported",
        }
    }
}

//create validator by assigning the rules
createValidator(rules)

const payload = {
    profile: "req.file" //specify the path to the file object properly in your project
}

//validate the payload
if (validate(payload) === true) {
    console.info("Payload is valid")
} else {
    console.info("Payload is invalid")
    //get the error
    console.error("Error:", getError())
    //get all errors
    // console.log("Errors:", getErrors())
}
