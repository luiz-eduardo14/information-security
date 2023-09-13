import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showErrorMessage = (message: string) => {
    toast.error(message);
}

const showSuccessMessage = (message: string) => {
    toast.success(message);
}

export const Toast = {
    showErrorMessage,
    showSuccessMessage
}