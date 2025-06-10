// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import { loginType } from 'src/types/auth/auth';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { NavLink } from 'react-router-dom';

const AuthTwoSteps = ({
    clickButton,
    handleChange,
    handleComplete,
    isSubmitting,
    value,
    onSubmit,
    resendOtp,
    resendText,
    remainingTime
}: loginType) => {
    const validateChar = (character: string) => /^[0-9]$/.test(character);
    // const handleOtpChange = (newValue: string) => {

    // };

    return (
        <>
            <Box mt={4}>
                <form onSubmit={onSubmit}>
                    <Stack mb={3}>
                        <CustomFormLabel htmlFor="code">Type your 4 digits security code </CustomFormLabel>
                        <Stack spacing={2} direction="row">
                            <MuiOtpInput
                                validateChar={validateChar}
                                length={4}
                                value={value}
                                onChange={handleChange}
                                onComplete={handleComplete}
                                autoFocus
                            />
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1} my={3}>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {`Didn't get the code?`}
                        </Typography>

                        <Typography
                            // component={Button} // Uncomment if you want it to behave like a Link
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: resendText ? 'text.disabled' : 'primary.main',
                                cursor: resendText ? 'not-allowed' : 'pointer',
                                pointerEvents: resendText ? 'none' : 'auto' // Disables interaction
                            }}
                            onClick={!resendText ? resendOtp : null}
                            // onClick={resendOtp}
                        >
                            resend {remainingTime == 0 ? '' : remainingTime}
                        </Typography>
                    </Stack>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={clickButton}
                        type="submit"
                    >
                        {isSubmitting ? 'Veryfying...' : 'Veryfy OTP'}
                    </Button>
                </form>
            </Box>
        </>
    );
};
export default AuthTwoSteps;
