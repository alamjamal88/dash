// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { loginType } from 'src/types/auth/auth';
import { MuiOtpInput } from 'mui-one-time-password-input';

const AuthTwoSteps = ({ clickButton, handleChange, handleComplete, isSubmitting, value, onSubmit }: loginType) => {
    const validateChar = (character: string) => /^[0-9]$/.test(character);
    return (
        <>
            <Box mt={4}>
                <form onSubmit={onSubmit}>
                    <Stack mb={3}>
                        <CustomFormLabel htmlFor="code">Type your 6 digits security code </CustomFormLabel>
                        <Stack spacing={2} direction="row">
                            <CustomTextField id="code" variant="outlined" fullWidth />
                            <CustomTextField id="code" variant="outlined" fullWidth />
                            <CustomTextField id="code" variant="outlined" fullWidth />
                            <CustomTextField id="code" variant="outlined" fullWidth />
                            <CustomTextField id="code" variant="outlined" fullWidth />
                            <CustomTextField id="code" variant="outlined" fullWidth />
                        </Stack>
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

                    <Stack direction="row" spacing={1} mt={3}>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                            Didn't get the code?
                        </Typography>
                        <Typography
                            component={Link}
                            to="/auth/login"
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main'
                            }}
                        >
                            Resend
                        </Typography>
                    </Stack>
                </form>
            </Box>
        </>
    );
};
export default AuthTwoSteps;
