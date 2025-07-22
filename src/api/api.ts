import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export interface IContactFormData {
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string
}

export const submitContactForm = async (data: IContactFormData) => {
    console.log(API_BASE_URL)
    try {
        const res = await axios.post(`${API_BASE_URL}/api/contact`, data);
        console.log(res)
        return res.data
    } catch (err) {
        throw new Error('Something went wrong');
    }
};