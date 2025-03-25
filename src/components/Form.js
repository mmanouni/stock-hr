import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onSubmit(formData);
        }
    };

    const validate = (data) => {
        const errors = {};
        // Add validation logic here
        if (!data.name) errors.name = 'Name is required';
        if (!data.email) errors.email = 'Email is required';
        return errors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleChange} />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
