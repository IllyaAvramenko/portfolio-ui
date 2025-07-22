import React, { useEffect, useState } from 'react';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '../../components';
import './ContactPage.css';
import { IContactFormData, submitContactForm } from '../../api/api';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required field'),
  lastName: Yup.string().required('Required field'),
  email: Yup.string().email('Invalid email').required('Required field'),
  subject: Yup.string().required('Required field'),
  message: Yup.string().required('Required field'),
});

export const ContactPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: IContactFormData, { resetForm }: FormikHelpers<IContactFormData>) => {
    try {
      await submitContactForm(values);
      setMessage("Thank you! Your message has been successfully submitted.");
      setError(null);
      resetForm();
    } catch (e) {
      setError("Oops! Something went wrong. Please try again later.");
      setMessage(null);
    }
  };

  useEffect(() => {
    if (message || error) {
      const timeout = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 10000); // 10 seconds

      // Cleanup function
      return () => clearTimeout(timeout);
    }
  }, [message, error]);


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: onSubmit,
    validateOnBlur: false,
    validateOnChange: true,
  });

  return (
    <div className="contact-wrapper">
      <p className="contact-description">
        Thank you for your interest in my work. Complete the form below and I will respond as soon as possible. Anna
      </p>

      <div className="contact-content">
        <div className="contact-image">
          <div className="image-frame">
            <img src="https://picsum.photos/800/500?random=1" alt="Painting" />
          </div>
        </div>

        <FormikProvider value={formik}>

        <form onSubmit={formik.handleSubmit} className="contact-form">
          <div className="form-row">
            <Input name="firstName" label="First Name" required />
            <Input name="lastName" label="Last Name" required />
          </div>
          <div className="form-row">
            <Input name="email" label="Email Address" type="email" required />
          </div>
          <div className="form-row">
            <Input name="subject" label="Subject" required />
          </div>
          <Input name="message" label="Message" as="textarea" rows={5} required />

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <Button type="submit" isLoading={formik.isSubmitting}>SUBMIT</Button>
        </form>
        </FormikProvider>
      </div>
    </div>
  );
};