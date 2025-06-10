// src/utils/toast.ts
import toast from 'react-hot-toast';

export const showToast = {
    success: (message: string) => (message ? toast.success(message) : null),
    error: (message: string) => (message ? toast.error(message) : null)
};
