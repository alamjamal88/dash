import React, { useEffect, useState } from 'react';
import { Grid2 as Grid, Box, Typography, Stack, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthTwoSteps from './AuthTwoSteps';
import { useDispatch, useSelector } from 'src/store/Store';
import { sendOtp, verifyOtp } from 'src/store/auth/AuthSlice';
import { showToast } from 'src/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import useQuery from 'src/hooks/RouterHooks';
import moment from 'moment';
import { ErrorResponse } from 'src/store/common.type';
import { NavLink } from 'react-router-dom';

const calculateRemainingTime = (expireAt: string) => {
    const now = moment();
    const expirationTime = moment(expireAt);
    const remainingTime = expirationTime.diff(now, 'seconds');
    return remainingTime > 0 ? remainingTime : 0; // Ensure non-negative value
};

const TwoSteps = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const mobile = query.get('mobile') || '';
    const rememberParam = query.get('remember');
    const isRemember = rememberParam === 'true' || rememberParam === '1';
    const [otpValue, setOtpValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { otpResponse } = useSelector((state) => state.authReducer);

    const handleChange = (value: string) => {
        setOtpValue(value);
    };

    const handleComplete = async (otp: string) => {
        if (otp === otpValue) {
            return;
        }

        if (!otp.match(/[0-9]{4}/) || !mobile.match(/[6-9]{1}[0-9]{9}/)) {
            showToast.error('Provide Correct Mobile or OTP');
            return;
        }
        const userInfo = {
            mobile: mobile,
            code: otp,
            isRemember: Boolean(isRemember)
        };

        setIsSubmitting(true);
        await dispatch(verifyOtp(userInfo))
            .unwrap()
            .then(async (res) => {
                console.log(res, 'rers');
                localStorage.setItem('passCode', res.passCode);
                localStorage.setItem('refreshToken', res.refreshToken);
                await navigate('/dashboards/modern');
            })
            .catch((err: ErrorResponse) => {
                showToast.error(err.message);
                setIsSubmitting(false);
            });
    };

    const clickButton = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!otpValue.match(/[0-9]{4}/) || !mobile.match(/[6-9]{1}[0-9]{9}/)) {
            showToast.error('Provide Correct Mobile or OTP');
            return;
        }

        const userInfo = {
            mobile: mobile,
            code: otpValue,
            isRemember: Boolean(isRemember)
        };

        setIsSubmitting(true);
        await dispatch(verifyOtp(userInfo))
            .unwrap()
            .then(async (res) => {
                localStorage.setItem('passCode', res.passCode);
                // localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                await navigate('/dashboards/modern');
            })
            .catch((err: ErrorResponse) => {
                showToast.error(err.message);
                setIsSubmitting(false);
            });
    };

    const [rsendText, setResendText] = useState(true);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    useEffect(() => {
        if (otpResponse?.expiresAt) {
            setRemainingTime(calculateRemainingTime(otpResponse.expiresAt));
        }
    }, [otpResponse, otpResponse?.expiresAt]);

    useEffect(() => {
        if (remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on component unmount or when remainingTime changes
        } else {
            setResendText(false); // Hide alert after time reaches 0
        }
    }, [remainingTime]);

    const resendOtp = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (!mobile.match(/[6-9]{1}[0-9]{9}/)) {
            showToast.error('Input correct mobile number');
            return;
        }

        await dispatch(sendOtp({ mobile }))
            .unwrap()
            .then(async () => {
                await navigate(`/auth/two-steps?mobile=${mobile}`);
            })
            .catch((err: ErrorResponse) => {
                showToast.error(err.message);
            });
    };

    return (
        <>
            <PageContainer title="Two Steps" description="this is Two Steps page">
                <Grid container spacing={0} sx={{ overflowX: 'hidden', height: '100vh' }}>
                    {' '}
                    {/* Added height: '100vh' here */}
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
                            // Ensure this Grid item takes full height
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start', // Align logo to top
                            alignItems: 'center',
                            pb: 2 // Add some padding at the bottom if needed for image alignment
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
                            {/* Added flexGrow: 1 */}
                            <Box px={3} py={2}>
                                {' '}
                                {/* Added vertical padding to logo box */}
                                <Logo />
                            </Box>
                            <Box
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    display: {
                                        xs: 'none', // Keep hidden on extra-small (mobile portrait)
                                        sm: 'none', // Keep hidden on small (mobile landscape)
                                        md: 'flex' // Show from medium (tablet portrait / small laptop) onwards
                                    },
                                    flexGrow: 1,
                                    height: '100%'
                                }}
                            >
                                <img
                                    src={img1}
                                    alt="bg"
                                    style={{
                                        width: '100%',
                                        maxWidth: '500px',
                                        objectFit: 'contain'
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
                            md: 4,
                            lg: 4,
                            xl: 4
                        }}
                        sx={{
                            height: '100vh' // Ensure the right side also takes full viewport height
                        }}
                    >
                        <Box px={2} sx={{ maxWidth: '400px', width: '100%' }}>
                            {' '}
                            {/* Added maxWidth and width: '100%' for better responsiveness */}
                            <Typography variant="h4" fontWeight="700">
                                OTP Verification
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" mt={2} mb={1}>
                                We sent a verification code to your mobile.
                            </Typography>
                            <AuthTwoSteps
                                handleComplete={handleComplete}
                                handleChange={handleChange}
                                onSubmit={clickButton}
                                value={otpValue}
                                isSubmitting={isSubmitting}
                                resendOtp={resendOtp}
                                resendText={rsendText}
                                remainingTime={remainingTime}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PageContainer>
        </>
    );
};

export default TwoSteps;
