// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { HTMLInputTypeAttribute } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Divider,
    InputAdornment,
    IconButton,
    OutlinedInput,
    CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

import { loginType } from 'src/types/auth/auth';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CustomInputOnlyNumber } from 'src/components/application/InputNumber';
import { height, style } from '@mui/system';

const AuthLogin = ({
    title,
    subtitle,
    subtext,
    clickButton,
    handleChange,
    isSubmitting,
    setChecked,
    checked
}: loginType) => {
    return (
        <>
            {/* {title ? (
                <Typography fontWeight="700" variant="h3" mb={1}>
                    {title}
                </Typography>
            ) : null} */}

            {subtext}

            {/* <AuthSocialButtons title="Sign in with" /> */}
            {/* <Box mt={3}>
                <Divider>
                    <Typography
                        component="span"
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        position="relative"
                        px={2}
                    >
                        or sign in with
                    </Typography>
                </Divider>
            </Box> */}

            <form noValidate autoComplete="false">
                <Stack>
                    <Box>
                        <CustomFormLabel htmlFor="mobile">Mobile</CustomFormLabel>
                        <CustomInputOnlyNumber
                            name="mobile"
                            variant="outlined"
                            maxLength={10}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                                                alt="India Flag"
                                                style={{ width: '20px', height: '15px', marginRight: '5px' }}
                                            />
                                            +91
                                        </span>
                                    </InputAdornment>
                                ),
                                style: { height: '50px' }
                            }}
                        />
                    </Box>

                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <CustomCheckbox
                                        value={checked}
                                        onChange={(e) => {
                                            console.log(e.target.checked);
                                            setChecked(e.target.checked);
                                        }}
                                    />
                                }
                                label="Remeber this Device"
                            />
                        </FormGroup>
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={clickButton}
                        type="submit"
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                </Box>
            </form>

            {subtitle}
        </>
    );
};

export default AuthLogin;
