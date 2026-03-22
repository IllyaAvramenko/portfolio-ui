import React, { useEffect, useState } from 'react';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '../../components';
import './ContactPage.css';
import { IContactFormData, submitContactForm } from '../../api/api';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

const getValidationSchema = (t: TFunction) =>
  Yup.object({
    firstName: Yup.string().required(t('contact.form.validation.required')),
    lastName: Yup.string().required(t('contact.form.validation.required')),
    email: Yup.string()
      .email(t('contact.form.validation.email'))
      .required(t('contact.form.validation.required')),
    subject: Yup.string().required(t('contact.form.validation.required')),
    message: Yup.string().required(t('contact.form.validation.required')),
  });

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (
    values: IContactFormData,
    { resetForm }: FormikHelpers<IContactFormData>,
  ) => {
    try {
      await submitContactForm(values);
      setMessage(t('contact.form.success'));
      setError(null);
      resetForm();
    } catch {
      setError(t('contact.form.error'));
      setMessage(null);
    }
  };

  useEffect(() => {
    if (message || error) {
      const timeout = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 10000);

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
    validationSchema: getValidationSchema(t),
    onSubmit: onSubmit,
    validateOnBlur: false,
    validateOnChange: true,
  });

  return (
    <div className="contact-wrapper">
      <p className="contact-description">{t('contact.mainText')}</p>

      <div className="contact-content">
        <div className="contact-image">
          <div className="image-frame">
            <img src="https://picsum.photos/800/500?random=1" alt="Painting" />
          </div>
        </div>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="contact-form">
            <div className="form-row">
              <Input name="firstName" label={t('contact.form.name')} required />
              <Input name="lastName" label={t('contact.form.lastName')} required />
            </div>
            <div className="form-row">
              <Input name="email" label={t('contact.form.email')} type="email" required />
            </div>
            <div className="form-row">
              <Input name="subject" label={t('contact.form.subject')} required />
            </div>
            <Input
              name="message"
              label={t('contact.form.message')}
              as="textarea"
              rows={5}
              required
            />

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <Button type="submit" isLoading={formik.isSubmitting}>
              {t('contact.form.submit')}
            </Button>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};
