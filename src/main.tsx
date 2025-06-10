// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store, persistor } from './store/Store';
import Spinner from './views/spinner/Spinner';
import './utils/i18n';
import './_mockApis';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { LoadingBarProvider } from './context/topLoading';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        {/* <Suspense fallback={<Spinner />}> */}
        <PersistGate loading={null} persistor={persistor}>
            <Toaster position="top-right" reverseOrder={false} />
            <LoadingBarProvider>
                <App />
            </LoadingBarProvider>
        </PersistGate>
        {/* </Suspense> */}
    </Provider>
);
