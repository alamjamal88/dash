import { CssBaseline, ThemeProvider } from '@mui/material';

import { useDispatch, useSelector } from 'src/store/Store';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import Routes from './routes';
import { AppState } from './store/Store';
import { useEffect } from 'react';
import { getCsrfToken } from './store/auth/AuthSlice';

function App() {
    const theme = ThemeSettings();
    const customizer = useSelector((state: AppState) => state.customizer);
    const dispatch = useDispatch();

    // useEffect(() => {
    //   const fetchCsrfToken = async () => {
    //     if (!localStorage.getItem('csrfToken')) {
    //       await dispatch(getCsrfToken());
    //     }
    //   };
    //   fetchCsrfToken();
    // }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <RTL direction={customizer.activeDir ?? 'ltr'}>
                <CssBaseline />
                <BrowserRouter>
                    {' '}
                    {/* Wrap your app with BrowserRouter */}
                    <Routes />
                </BrowserRouter>
            </RTL>
        </ThemeProvider>
    );
}

export default App;
