import { useState } from 'react';

function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error;
        if (!value) {
            error = `${name} is required`;
        }
        // Add more validation rules as needed
        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        validate(name, value);
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (event, callback) => {
        event.preventDefault();
        const noErrors = Object.keys(errors).every((key) => !errors[key]);
        if (noErrors) {
            callback();
        } else {
            console.error('Validation errors:', errors);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
}
