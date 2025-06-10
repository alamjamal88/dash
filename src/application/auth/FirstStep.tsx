// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid2 as Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './AuthFirstSteps';
import { useDispatch, useSelector } from 'src/store/Store';
import EventEmitter from 'events';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { sendOtp } from 'src/store/auth/AuthSlice';
import { showToast } from 'src/utils/toast';
import { ErrorResponse } from 'src/store/common.type';

const Login = () => {
    const dispatch = useDispatch();
    const { loginDetail, token, isLoading } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();

    const [checked, setChecked] = useState<boolean>(false);
    const [sentOtp, setSentOtp] = useState(false);
    const [mobile, setMobile] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value);
        const value = event.target.value;
        if (value.length > 10) return;
        setMobile(value);
    };

    const clickButton = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();

        setIsSubmitting(true);

        if (!mobile.match(/[6-9]{1}[0-9]{9}/)) {
            showToast.error('Input correct mobile number');
            setIsSubmitting(false);
            return;
        }

        await dispatch(sendOtp({ mobile }))
            .unwrap()
            .then(async () => {
                await navigate(`/auth/two-steps?mobile=${mobile}&remember=${checked}`);
                // setSelectedIconForDomain(res.data.path);
            })
            .catch((err: ErrorResponse) => {
                console.log(err, 'err00');
                showToast.error(err.message);
                setIsSubmitting(false);
            });
        setIsSubmitting(false);
    };

    return (
        <PageContainer title="Login" description="this is Login page">
            <Grid container spacing={0} sx={{ overflowX: 'hidden', height: '100vh' }}>
                {' '}
                {/* ADDED: height: '100vh' for full screen */}
                <Grid
                    sx={{
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
                            backgroundSize: '400% 400%',
                            animation: 'gradient 15s ease infinite',
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            opacity: '0.3'
                        },
                        // ADDED: Flexbox properties to fill height consistently
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start', // Align logo to top
                        alignItems: 'center',
                        pb: 2 // Optional: Add some padding at the bottom if needed
                    }}
                    size={{
                        xs: 12,
                        sm: 12,
                        md: 8,
                        lg: 8,
                        xl: 8
                    }}
                >
                    <Box
                        position="relative"
                        sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        {' '}
                        {/* MODIFIED: flexGrow, display, flexDirection */}
                        <Box px={3} py={2}>
                            {' '}
                            {/* MODIFIED: Added py for consistent logo padding */}
                            <Logo />
                        </Box>
                        <Box
                            alignItems="center"
                            justifyContent="center"
                            // REMOVED: height={'calc(100vh - 75px)'} - This caused the bottom gap
                            width="100%"
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'none', // ADDED: Hide on sm screens
                                    md: 'flex' // MODIFIED: Show from md breakpoint onwards
                                },
                                flexGrow: 1, // ADDED: Allow this box to grow
                                height: '100%' // ADDED: Take available height within parent
                            }}
                        >
                            <img
                                src={img1}
                                alt="bg"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    objectFit: 'contain' // ADDED: Ensures image scales properly
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    size={{
                        xs: 12,
                        sm: 12,
                        md: 4, // ADDED: Ensure md breakpoint is handled
                        lg: 4,
                        xl: 4
                    }}
                    sx={{
                        height: '100vh' // ADDED: Ensure right side takes full viewport height
                    }}
                >
                    <Box px={2} py={0} sx={{ maxWidth: '400px', width: '100%' }}>
                        <Typography variant="h4" fontWeight="700">
                            Welcome to Mentally
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" mt={2} mb={4}>
                            Your Mental Health Companion
                        </Typography>
                        {/* MODIFIED: p={4}, added maxWidth, width */}
                        <AuthLogin
                            title="Welcome to Mentally"
                            // subtext={
                            //     <Typography variant="subtitle1" color="textSecondary" mb={1}>
                            //         Go to Your Dashboard
                            //     </Typography>
                            // }
                            clickButton={clickButton}
                            setChecked={setChecked}
                            checked={checked}
                            handleChange={handleChange}
                            isSubmitting={isSubmitting}
                        />
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
};
export default Login;
