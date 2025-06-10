import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { AxiosError } from 'axios';
import { axiosPrivate, axiosPublic } from 'src/utils/axios';
import { errorHandler } from 'src/utils/errorHandler';
import { UserData, UserState } from './user.model';
import { ErrorResponse } from '../common.type';

//initial state
const initialState: UserState = {
    isLoading: false,
    error: null,
    UserData: []
};

//async actions (Extra Reducers)
export const getAllUserData = createAsyncThunk<UserData[], void, { rejectValue: ErrorResponse }>(
    'auth/getAllUserData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get<UserData[]>('/user');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.UserData = [];
        }
    },
    // Handle the PURGE action to reset the state
    extraReducers: (builder) => {
        builder

            .addCase(getAllUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUserData.fulfilled, (state, action: PayloadAction<UserData[]>) => {
                state.isLoading = false;
                state.UserData = action.payload;
                state.error = null;
            })
            .addCase(getAllUserData.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            });
    }
});

export default userSlice.reducer;
