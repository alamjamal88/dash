import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery, CircularProgress } from '@mui/material';
import { persistor, useSelector } from 'src/store/Store';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons-react';
import { AppState } from 'src/store/Store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { userLogout } from 'src/store/auth/AuthSlice';
import { useDispatch } from 'src/store/Store';
import { showToast } from 'src/utils/toast';
import { useState } from 'react';
import { ErrorResponse } from 'src/store/common.type';
export const Profile = () => {
    const customizer = useSelector((state: AppState) => state.customizer);
    interface User {
        name?: string;
        roles?: string;
        // add other user properties if needed
    }

    interface LoginDetail {
        user?: User;
        // add other loginDetail properties if needed
    }

    const { loginDetail } = useSelector((state: AppState) => state.authReducer) as { loginDetail: LoginDetail };

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            setIsLoading(true);
            await dispatch(userLogout());
            await persistor.purge();
            localStorage.clear();
            await navigate('/');
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'message' in error) {
                showToast.error((error as { message?: string }).message || 'An unknown error occurred.');
            } else {
                showToast.error('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box display={'flex'} alignItems="center" gap={2} sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}>
            {!hideMenu ? (
                <>
                    <Avatar alt="Remy Sharp" src={img1} />

                    <Box>
                        <Typography variant="h6">{loginDetail?.user?.name} </Typography>
                        <Typography variant="caption">{loginDetail?.user?.roles}</Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <Tooltip title="Logout" placement="top">
                            <IconButton
                                color="primary"
                                onClick={handleClick}
                                aria-label="logout"
                                size="small"
                                disabled={isLoading}
                            >
                                {isLoading ? <CircularProgress size={20} color="inherit" /> : <IconPower size="20" />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>
            ) : (
                ''
            )}
        </Box>
    );
};
