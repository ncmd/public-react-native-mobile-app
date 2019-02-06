import validation from 'validate.js'

export default function validate(fieldName, value) {
    var constraints = {
	email: {
	    presence: true,
	    format: {
	        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	        message: 'Invalid Email Address Format',
	    }
	},
	password: {
	    presence: true,
	    length: {
	        minimum: 4,
	        message: 'Invalid Password Format',
	    }
	},
	confirmPassword: {
	    presence: true,
	    equality: 'password'
	},
	phoneNo: {
	    presence: true,
	    format: {
	        pattern: "^[0-9]{10}$",
	        message: 'Invalid Phone Number',
	    },
	},
    };

    var formValues = {}
    formValues[fieldName] = value

    var formFields = {}
    formFields[fieldName] = constraints[fieldName]


    const result = validation(formValues, formFields)

    if (result) {
	return result[fieldName][0]
    }
    return null
}