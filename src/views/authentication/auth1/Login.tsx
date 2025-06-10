// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid2 as Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';
import { useDispatch, useSelector } from 'src/store/Store';
import EventEmitter from 'events';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userLogin } from 'src/store/auth/AuthSlice';
import { showToast } from 'src/utils/toast';
import { ErrorResponse } from 'src/store/common.type';

const Login = () => {
    const dispatch = useDispatch();
    const { loginDetail, token, isLoading } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const clickButton = () => {
        console.log('hellp');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value);
    };

    const initialValues = {
        email: '',
        password: ''
    };
    const validationSchema = yup.object().shape({
        email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: yup.string().max(255).required('Password is required')
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            dispatch(userLogin(values))
                .unwrap()
                .then(async (res) => {
                    const data = res.data as { passCode: string }[]; // type assertion
                    localStorage.setItem('passCode', JSON.stringify(data[0].passCode));
                    await navigate('/dashboards/modern');
                    // setSelectedIconForDomain(res.data.path);
                })
                .catch((err: ErrorResponse) => {
                    console.log(err, 'err00');
                    showToast.error(err.message);
                    setSubmitting(false);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    });

    return (
        <PageContainer title="Login" description="this is Login page">
            <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
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
                        }
                    }}
                    size={{
                        xs: 12,
                        sm: 12,
                        lg: 7,
                        xl: 8
                    }}
                >
                    <Box position="relative">
                        <Box px={3}>
                            <Logo />
                        </Box>
                        <Box
                            alignItems="center"
                            justifyContent="center"
                            height={'calc(100vh - 75px)'}
                            sx={{
                                display: {
                                    xs: 'none',
                                    lg: 'flex'
                                }
                            }}
                        >
                            <img
                                src={img1}
                                alt="bg"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px'
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
                        lg: 5,
                        xl: 4
                    }}
                >
                    <Box p={4}>
                        <form onSubmit={formik.handleSubmit}>
                            <AuthLogin
                                title="Welcome to InstaXerox"
                                subtext={
                                    <Typography variant="subtitle1" color="textSecondary" mb={1}>
                                        Your Admin Dashboard
                                    </Typography>
                                }
                                subtitle={
                                    <Stack direction="row" spacing={1} mt={3}>
                                        <Typography color="textSecondary" variant="h6" fontWeight="500">
                                            New to InstaXerox?
                                        </Typography>
                                        <Typography
                                            component={Link}
                                            to="/auth/register"
                                            fontWeight="500"
                                            sx={{
                                                textDecoration: 'none',
                                                color: 'primary.main'
                                            }}
                                        >
                                            Create an account
                                        </Typography>
                                    </Stack>
                                }
                                clickButton={clickButton}
                                handleChange={handleChange}
                                formik={formik}
                            />
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
};
export default Login;
