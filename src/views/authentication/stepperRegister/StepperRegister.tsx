import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch } from 'src/store/Store';
import { userRegister, sendOtp, verifyOtp } from 'src/store/auth/AuthSlice';
import { showToast } from 'src/utils/toast';
import { axiosPublic } from 'src/utils/axios';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import HorizontalStepper from './HorizontalStepper';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import FinalStep from './FinalStep';
import moment from 'moment';

interface Hospital {
    id: string;
    name: string;
}

interface AddressResponse {
    district: string;
    state: string;
}

const calculateRemainingTime = (expireAt: string) => {
    const now = moment();
    const expirationTime = moment(expireAt);
    const remainingTime = expirationTime.diff(now, 'seconds');
    return remainingTime > 0 ? remainingTime : 0;
};

const StepperRegister = () => {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [addressDetails, setAddressDetails] = useState<AddressResponse | null>(null);
    const [resendText, setResendText] = useState(true);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    const [formData, setFormData] = useState({
        mobile: '',
        rememberDevice: false,
        otp: '',
        email: '',
        password: '',
        confirmPassword: '',
        hospitalName: '',
        hospitalId: '',
        pincode: '',
        streetAddress: '',
        district: '',
        state: ''
    });

    useEffect(() => {
        if (remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setResendText(false);
        }
    }, [remainingTime]);

    const handleNext = async () => {
        setIsSubmitting(true);
        try {
            if (activeStep === 0) {
                // Send OTP
                await dispatch(sendOtp({ mobile: formData.mobile })).unwrap();
                setActiveStep((prevStep) => prevStep + 1);
            } else if (activeStep === 1) {
                // Verify OTP
                await dispatch(
                    verifyOtp({
                        mobile: formData.mobile,
                        code: formData.otp,
                        isRemember: formData.rememberDevice
                    })
                ).unwrap();
                setActiveStep((prevStep) => prevStep + 1);
            } else if (activeStep === 2) {
                // Complete Registration
                const registrationData = new FormData();
                registrationData.append(
                    'data',
                    JSON.stringify({
                        ...formData,
                        district: addressDetails?.district,
                        state: addressDetails?.state
                    })
                );
                await dispatch(userRegister(registrationData)).unwrap();
                showToast.success('Registration successful');
            }
        } catch (error: any) {
            showToast.error(error.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleHospitalSearch = async (searchTerm: string) => {
        try {
            const response = await axiosPublic.get(`/api/hospitals/search?q=${searchTerm}`);
            setHospitals(response.data);
        } catch (error) {
            showToast.error('Failed to fetch hospitals');
        }
    };

    const handlePincodeSearch = async (pincode: string) => {
        if (pincode.length === 6) {
            try {
                const response = await axiosPublic.get(`/api/address/${pincode}`);
                setAddressDetails(response.data);
            } catch (error) {
                showToast.error('Failed to fetch address details');
            }
        }
    };

    const resendOtp = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(sendOtp({ mobile: formData.mobile })).unwrap();
            setResendText(true);
            // Reset timer
            setRemainingTime(60); // or whatever your OTP expiry time is
        } catch (error: any) {
            showToast.error(error.message || 'Failed to resend OTP');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <FirstStep
                        handleNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                        isSubmitting={isSubmitting}
                    />
                );
            case 1:
                return (
                    <SecondStep
                        handleNext={handleNext}
                        handleBack={handleBack}
                        formData={formData}
                        setFormData={setFormData}
                        isSubmitting={isSubmitting}
                        resendOtp={resendOtp}
                        resendText={resendText}
                        remainingTime={remainingTime}
                    />
                );
            case 2:
                return (
                    <FinalStep
                        handleBack={handleBack}
                        formData={formData}
                        setFormData={setFormData}
                        isSubmitting={isSubmitting}
                        hospitals={hospitals}
                        handleHospitalSearch={handleHospitalSearch}
                        handlePincodeSearch={handlePincodeSearch}
                        addressDetails={addressDetails}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <PageContainer title="Registration" description="Registration page">
            <Grid container spacing={0} sx={{ height: '100vh' }}>
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
                    item
                    xs={12}
                    sm={12}
                    lg={8}
                    xl={8}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        alignItems="center"
                        p={3}
                    >
                        <Box width="100%" mb={3}>
                            <Logo />
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flex={1}
                            width="100%"
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'none',
                                    md: 'flex'
                                }
                            }}
                        >
                            <img
                                src="/src/assets/images/backgrounds/login-bg.svg"
                                alt="login"
                                style={{
                                    maxWidth: '100%',
                                    width: '500px'
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box p={4} width="100%" maxWidth="500px">
                        <HorizontalStepper activeStep={activeStep} />
                        {getStepContent(activeStep)}
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default StepperRegister; 