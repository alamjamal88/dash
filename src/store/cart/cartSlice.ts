import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosPublic } from 'src/utils/axios';
import { errorHandler } from 'src/utils/errorHandler';

// Define types
type CartState = {
    isLoading: boolean;
    error: string | null;
    cartItems: CartItem[];
};

type CartItem = {
    id?: string; // Optional in case backend auto-generates it
    fileName: string | null;
    colorType: string;
    printSize: string;
    printMedia: string;
    printSides: string;
    binding: string;
    copies: number;
    deleteAfterDelivery: boolean;
    price: number;
};

type AddToCartPayload = Omit<CartItem, 'price'> & { userId: string };
type UpdateQuantityPayload = { productId: string; quantity: number };
type DeleteCartPayload = { productId: string };
type ErrorResponse = { message: string; [key: string]: any };

// Initial state
const initialState: CartState = {
    isLoading: false,
    error: null,
    cartItems: []
};

// Async actions (Extra Reducers)
export const addToCart = createAsyncThunk<CartItem, AddToCartPayload, { rejectValue: ErrorResponse }>(
    'cart/addToCart',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post<CartItem>('/cart/add', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

export const updateQuantity = createAsyncThunk<CartItem, UpdateQuantityPayload, { rejectValue: ErrorResponse }>(
    'cart/updateQuantity',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.put<CartItem>('/cart/update', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

export const deleteCartItem = createAsyncThunk<string, DeleteCartPayload, { rejectValue: ErrorResponse }>(
    'cart/deleteCartItem',
    async (payload, { rejectWithValue }) => {
        try {
            await axiosPublic.delete('/cart/delete', {
                data: payload,
                headers: { 'Content-Type': 'application/json' }
            });
            return payload.productId;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return rejectWithValue(errorHandler(axiosError));
        }
    }
);

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add a cart item locally
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.cartItems.find(
                (item) => item.fileName === action.payload.fileName && item.colorType === action.payload.colorType
            );
            if (existingItem) {
                existingItem.copies += action.payload.copies;
            } else {
                state.cartItems.push(action.payload);
            }
        },

        // Update quantity locally
        updateItemQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
            const item = state.cartItems.find((cartItem) => cartItem.id === action.payload.productId);
            if (item) {
                item.copies = action.payload.quantity;
            }
        },

        // Remove an item locally
        removeItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },

        // Clear the entire cart
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Add to Cart API
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.isLoading = false;
                state.cartItems.push(action.payload);
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Quantity API
            .addCase(updateQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateQuantity.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.isLoading = false;
                const item = state.cartItems.find((cartItem) => cartItem.id === action.payload.id);
                if (item) {
                    item.copies = action.payload.copies;
                }
                state.error = null;
            })
            .addCase(updateQuantity.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Cart Item API
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteCartItem.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { addItem, updateItemQuantity, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
