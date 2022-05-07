import { object, string } from 'yup';

const signUpSchema = object({
	email: string()
		.email('Enter your email in the format: yourname@example.com')
		.required('Email is required'),
	password: string()
		.min(8, 'Password must be at least 8 characters long')
		.required('Password is required')
		.test(
			'contains-lowercase',
			'Password must have at least 1 lowercase character',
			function (value) {
				return !!value && /[a-z]/.test(value);
			}
		)
		.test(
			'contains-uppercase',
			'Password must have at least 1 uppercase character',
			function (value) {
				return !!value && /[A-Z]/.test(value);
			}
		)
		.test(
			'contains-number',
			'Password must have at least 1 number',
			function (value) {
				return !!value && /\d/.test(value);
			}
		)
		.test(
			'contains-special-character',
			'Password must contain one of the following characters:  !"#$%&\'()*+,-./:;<=>?@[\\]^_`{}|~',
			function (value) {
				return (
					!!value && /[ !"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{}|~]/.test(value)
				);
			}
		)
});

export default signUpSchema;