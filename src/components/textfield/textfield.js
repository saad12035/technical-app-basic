import React from 'react';
import { ErrorMessage, useField } from 'formik';
import './textfield.css';

export const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    console.log(props.a)
    return (
        <div className="fields mb-2" >
            <label htmlFor={field.name}>{label}</label>
            <input
                placeholder={props.a}
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
}