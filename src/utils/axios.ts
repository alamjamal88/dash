import axios from 'axios';

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;

// import { userLogout, userRefresh } from 'redux/reducers/auth/auth.slice';
// import { dispatch, getState , persistor} from '../redux/store'

const abortController = new AbortController();
let abortSource = axios.CancelToken.source();

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const axiosCsrf = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// const requestInterceptor = axiosPrivate.interceptors.request.use(
//   config => {
//     const currentUser1 = JSON.parse(localStorage.getItem('currentUser1'))
//     if (!config.headers['x-access-token']) {
//       config.headers['x-access-token'] = `${currentUser1.accessToken}`;
//     }
//     return config;
//   }, (error) => Promise.reject(error.message)
// );

// });

axiosPublic.interceptors.request.use(
    async (config) => {
        const csrfToken = localStorage.getItem('csrfToken');
        if (!csrfToken) {
            // Fetch CSRF token if not present
            const session = await axiosCsrf.get('/health');
            const response = await axiosCsrf.get('/csrf-token');
            // csrfToken = response.data.csrfToken;
            // Save the actual token, not 'true'
            localStorage.setItem('csrfToken', 'true');
        }
        // Cancel the previous request (if any) before making a new request
        if (abortSource) {
            abortSource.cancel('Request canceled due to new request');
        }
        // Create a new cancellation token for the current request
        abortSource = axios.CancelToken.source();
        config.cancelToken = abortSource.token;

        return config;
    },
    (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;

        if (prevRequest?.url?.includes('/auth/user/logout/')) {
            // Directly clear storage and redirect on logout failure
            localStorage.clear();
            window.location.href = '/auth/login';
            return Promise.reject(error);
        }

        if (error?.response?.status === 401 && !prevRequest?.sent) {
            try {
                prevRequest.sent = true;
                await axiosPublic.post(
                    '/auth/user/access-token/',
                    { refreshToken: localStorage.getItem('refreshToken') },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                return axiosPrivate(prevRequest); // Retry the original request
            } catch (tokenRefreshError) {
                localStorage.clear();
                window.location.href = '/auth/login'; // Redirect to login if token refresh fails
                return Promise.reject(tokenRefreshError);
            }
        }

        return Promise.reject(error); // Other errors
    }
);

// export const ejectInterceptors = () => {
//   axios.interceptors.request.eject(requestInterceptor);
//   axios.interceptors.response.eject(responseInterceptor);
// };

// export const cancelRequest = () => {
//   ejectInterceptors();
//   abortController.abort();
// };

export const makePrivateRequestGet = async (url: string, abortController: AbortController) => {
    try {
        const response = await axiosPrivate.get(url, {
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            // Handle cancellation if needed
        } else {
            throw error;
        }
    } finally {
        abortController.abort(); // Clean up the AbortController
    }
};

export const makePrivateRequestPost = async (url: string, payload: any, abortController: AbortController) => {
    try {
        const response = await axiosPrivate.get(url, {
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            // Handle cancellation if needed
        } else {
            throw error;
        }
    } finally {
        abortController.abort(); // Clean up the AbortController
    }
};

export const makePrivateRequestPut = async (url: string, payload: any, abortController: AbortController) => {
    try {
        const response = await axiosPrivate.put(url, payload, {
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            // Handle cancellation if needed
        } else {
            throw error;
        }
    } finally {
        abortController.abort(); // Clean up the AbortController
    }
};

export const makePrivateRequestPatch = async (url: string, payload: any, abortController: AbortController) => {
    try {
        const response = await axiosPrivate.patch(url, payload, {
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            // Handle cancellation if needed
        } else {
            throw error;
        }
    } finally {
        abortController.abort(); // Clean up the AbortController
    }
};

export const makePrivateRequestDelete = async (url: string, abortController: AbortController) => {
    try {
        const response = await axiosPrivate.patch(url, {
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            // Handle cancellation if needed
        } else {
            throw error;
        }
    } finally {
        abortController.abort(); // Clean up the AbortController
    }
};
