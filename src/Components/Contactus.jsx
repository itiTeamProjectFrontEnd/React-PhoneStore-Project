import React, { useState } from 'react';
import styles from '../Styles/ContactUs.module.css'
import { Link } from 'react-scroll';
const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Please Enter Your Name';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            newErrors.email = 'Please Enter Your Email  ';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            alert('Form submitted successfully!');
            localStorage.setItem('contactData', JSON.stringify(formData));
            setFormData({ name: '', email: '', subject: '' });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className={`${styles.formContainer}`} id='contact'>
            <h1 className={`text-center mb-2`}>Contact Us</h1>
            <h4 className={`${styles.formTitle}`}>Drop Us a Line</h4>
            <p className={`${styles.formPara}`}>
                Sent us your message and we will contact you soon.
            </p>
            <form onSubmit={handleSubmit} className={`${styles.form}`}>
                <div className={`${styles.formGroup} `}>
                    <div className="d-flex flex-column w-100 mb-2 " >
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`${styles.formControl}`}
                        />
                        {errors.name && (
                            <span className={`${styles.error}`}>{errors.name}</span>
                        )}
                    </div>
                    <div className="d-flex flex-column w-100 mb-2 " >
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.formControl}`}
                        />
                        {errors.email && (
                            <span className={`${styles.error}`}>{errors.email}</span>
                        )}
                    </div>
                </div>

                <div className="d-flex flex-column w-100 mb-2 " >
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`${styles.formControl}`}
                    />
                    {errors.subject && (
                        <span className={`${styles.error}`}>{errors.subject}</span>
                    )}
                </div>

                <textarea
                    name="message"
                    placeholder="Message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.formControl}`}
                    rows="4"
                ></textarea>
                {errors.message && (
                    <span className={`${styles.error}`}>{errors.message}</span>
                )}
                    <button type="submit" className={`${styles.submitButton}`}>
                        Send message
                    </button>

            </form>

        </div>
    );
};

export default ContactUs;
