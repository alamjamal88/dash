import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { showToast } from 'src/utils/toast';

interface SecondStepProps {
    handleNext: () => void;
    handleBack: () => void;
    formData: {
        otp: string;
    };
    setFormData: (data: any) => void;
    isSubmitting: boolean;
    resendOtp: () => void;
    resendText: boolean;
    remainingTime: number;
}

const SecondStep = ({
    handleNext,
    handleBack,
    formData,
    setFormData,
    isSubmitting,
    resendOtp,
    resendText,
    remainingTime
}: SecondStepProps) => {
    const validateOtp = (otp: string): boolean => {
        if (!otp) {
            showToast.error('OTP is required');
            return false;
        }
        if (!otp.match(/^\d{4}$/)) {
            showToast.error('Please enter a valid 4-digit OTP');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateOtp(formData.otp)) {
            handleNext();
        }
    };

    const handleOtpChange = (value: string) => {
        // Only allow numbers
        if (value && !/^\d*$/.test(value)) return;
        setFormData({ ...formData, otp: value });
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="700">
                OTP Verification
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mt={2} mb={4}>
                We sent a verification code to your mobile.
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <CustomFormLabel>Type your 4 digits security code</CustomFormLabel>
                        <MuiOtpInput
                            value={formData.otp}
                            onChange={handleOtpChange}
                            length={4}
                            validateChar={(char) => /^\d$/.test(char)}
                            TextFieldsProps={{
                                placeholder: '0',
                                error: formData.otp.length > 0 && !validateOtp(formData.otp)
                            }}
                        />
                    </Box>

                    {resendText && remainingTime > 0 && (
                        <Typography variant="body2" color="textSecondary">
                            Resend OTP in {remainingTime} seconds
                        </Typography>
                    )}

                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" onClick={handleBack} fullWidth>
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                    </Stack>

                    {!resendText && (
                        <Stack direction="row" spacing={1} justifyContent="center">
                            <Typography color="textSecondary" variant="body2">
                                Didn't get the code?
                            </Typography>
                            <Typography
                                component="button"
                                variant="body2"
                                onClick={resendOtp}
                                sx={{
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Resend
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </form>
        </Box>
    );
};

export default SecondStep; 