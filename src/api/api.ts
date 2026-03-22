import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface IContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const submitContactForm = async (data: IContactFormData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/contact`, data);
    return res.data;
  } catch {
    throw new Error('Something went wrong');
  }
};
