import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, createTransform, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CryptoJS from 'crypto-js';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { RootState } from './Reducers';

// Define state type for encryption transform

// Encryption transform with TypeScript
const encrypt = createTransform(
    (inboundState: any, key) => {
        if (!inboundState) return inboundState;
        const secretKey = 'default-fallback-key';
        const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), secretKey);
        return cryptedText?.toString();

        // const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), store.getState().auth.passCode);
        // return cryptedText.toString();
    },
    (outboundState: any, key) => {
        if (!outboundState) return outboundState;
        const secretKey = 'default-fallback-key';
        const bytes = CryptoJS.AES.decrypt(outboundState, secretKey);
        const decrypted = bytes?.toString(CryptoJS.enc.Utf8);
        console.log(decrypted, 'decrypted');
        return JSON.parse(decrypted);

        // const bytes = CryptoJS.AES.decrypt(outboundState, store.getState().auth.passCode);
        // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        // return JSON.parse(decrypted);
    }
);

// Persist configuration
const persistConfig: PersistConfig<RootState> = {
    key: 'secure',
    storage,
    whitelist: ['authReducer', 'cartReducer'], // Only persist the auth slice
    // stateReconciler: autoMergeLevel2, // Use autoMergeLevel2 for state reconciliation
    transforms: [encrypt] // Apply encryption transform
};

// Persisted reducer with TypeScript
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store setup with TypeScript
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

// Persistor
export const persistor = persistStore(store);

// Typed hooks for Redux
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;
