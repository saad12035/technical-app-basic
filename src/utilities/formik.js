import * as Yup from "yup";

export const validate = Yup.object({
    name: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(15, 'Must be 15 characters or less')
        .required('Fullname is Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    role: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid role')
        .required('Role is required'),
})