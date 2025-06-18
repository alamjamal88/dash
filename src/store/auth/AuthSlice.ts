import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { AxiosError } from 'axios';
import { axiosPrivate, axiosPublic } from 'src/utils/axios';
import { errorHandler } from 'src/utils/errorHandler';
import { AuthState, tokenUserData as UserData, LoginResponse, OtpResponse } from './auth.model';
import { RootState } from '../Reducers';
import { ErrorResponse } from '../common.type';
// Define the types for the state and API responses

// Initial state
const initialState: AuthState = {
    isLoading: false,
    error: null,
    token: null,
    passCode: null,
    loginDetail: null,
    isAuthenticated: false,
    loginDetailFirebase: null,
    otpResponse: null,
    UserData: null
};

// Async actions

export const getCsrfToken = createAsyncThunk<string, { rejectValue: ErrorResponse }>(
    'auth/csrfToken',
    async (_, { rejectWithValue }) => {
        try {
            await axiosPublic.get('/health');
            const response = await axiosPublic.get<string>('/csrf-token');
            localStorage.setItem('csrfToken', 'true');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

export const sendOtp = createAsyncThunk<OtpResponse, Record<string, unknown>, { rejectValue: ErrorResponse }>(
    'auth/sendOtp',
    async (userInfo, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post<OtpResponse>('/auth/user/request-otp', userInfo);
            console.log('verifyOtp', response.data.code);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

export const verifyOtp = createAsyncThunk<LoginResponse, Record<string, unknown>, { rejectValue: ErrorResponse }>(
    'auth/verifyOtp',
    async (userInfo, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post<LoginResponse>('/auth/user/verify-otp', userInfo);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);
export const userLogout = createAsyncThunk<void, void, { rejectValue: ErrorResponse }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post<void>('/auth/user/logout/', {
                refreshToken: localStorage.getItem('refreshToken')
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

export const currentUser = createAsyncThunk<UserData, void, { rejectValue: ErrorResponse }>(
    'auth/me',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get<UserData>('/auth/user/me');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

export const userRefresh = createAsyncThunk<LoginResponse, void, { rejectValue: ErrorResponse }>(
    'auth/refresh',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post<LoginResponse>('/auth/user/access-token', {
                refreshToken: localStorage.getItem('refreshToken')
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

//======================== Old Code =========================
export const userLogin = createAsyncThunk<LoginResponse, Record<string, any>, { rejectValue: ErrorResponse }>(
    'auth/login',
    async (userInfo, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post<LoginResponse>('/users/public/login/', userInfo, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

// export const firebaseLogin = createAsyncThunk<LoginResponse, Record<string, any>, { rejectValue: ErrorResponse }>(
//     'auth/firebaseLogin',
//     async (userInfo, { rejectWithValue }) => {
//         try {
//             const response = await axiosPublic.post<LoginResponse>('/users/public/firebaseLogin', userInfo, {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             });
//             return response.data;
//         } catch (error) {
//             const axiosError = error as AxiosError<ErrorResponse>;
//             return rejectWithValue(errorHandler(axiosError));
//         }
//     }
// );

interface UserRegisterResponse {
    token: string;
    user: UserData;
}

interface UserRegisterPayload extends FormData {
    // FormData will contain both file and JSON data
}

export const userRegister = createAsyncThunk<UserRegisterResponse, UserRegisterPayload, { rejectValue: ErrorResponse }>(
    'auth/userRegister',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post<UserRegisterResponse>('/users/public/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

// export const activateAccount = createAsyncThunk<any, Record<string, any>, { rejectValue: ErrorResponse }>(
//     'auth/activateAccount',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const response = await axiosPublic.post<any>('/users/public/activate/', payload);
//             return response.data;
//         } catch (error) {
//             const axiosError = error as AxiosError<ErrorResponse>;
//             return rejectWithValue(errorHandler(axiosError));
//         }
//     }
// );

// export const resendLink = createAsyncThunk<any, { email: string }, { rejectValue: ErrorResponse }>(
//     'auth/resendLink',
//     async (email, { rejectWithValue }) => {
//         try {
//             const response = await axiosPublic.post<any>('/users/public/resendlink/', email);
//             return response.data;
//         } catch (error) {
//             const axiosError = error as AxiosError<ErrorResponse>;
//             return rejectWithValue(errorHandler(axiosError));
//         }
//     }
// );

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(userLogin.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(userLogin.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            //     state.isLoading = false;
            //     state.loginDetail = action.payload;
            //     state.token = action.payload.accessToken;
            //     state.passCode = action.payload.passCode;
            //     state.isAuthenticated = true;
            //     state.error = null;
            // })
            // .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
            //     state.isLoading = false;
            //     state.error = action.payload;
            // })

            .addCase(verifyOtp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isLoading = false;
                state.loginDetail = action.payload;
                state.passCode = action.payload.passCode;
                state.isAuthenticated = true;
                state.error = null;
            })

            .addCase(verifyOtp.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })

            .addCase(sendOtp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendOtp.fulfilled, (state, action: PayloadAction<OtpResponse>) => {
                state.isLoading = false;
                state.otpResponse = action.payload;
                state.error = null;
            })
            .addCase(sendOtp.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })

            .addCase(PURGE, () => initialState)
            .addCase(userLogout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.isLoading = false;
                state.loginDetail = null;
                state.token = null;
                state.passCode = null;
                state.isAuthenticated = false;
            })
            .addCase(userLogout.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })

            .addCase(currentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(currentUser.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.isLoading = false;
                state.UserData = action.payload;
                state.error = null;
            })
            .addCase(currentUser.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            });
    }
});

export const { login, logout } = authSlice.actions;

// export const selectAuthState = (state: { auth: RootState }) => state.auth;
// export const selectAuthState = (state: RootState) => state.auth;
// import selectAuthState from './reducers/auth/auth.slice';

export default authSlice.reducer;
