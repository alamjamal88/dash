// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
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
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AuthLogin = ({ title, subtitle, subtext, clickButton, handleChange, formik }: loginType) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h3" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <AuthSocialButtons title="Sign in with" />
            <Box mt={3}>
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
            </Box>

            <Stack>
                <Box>
                    <CustomFormLabel htmlFor="email">Username</CustomFormLabel>
                    <CustomTextField
                        name="email"
                        variant="outlined"
                        onChange={handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.email && formik.touched.email)}
                        fullWidth
                    />
                    {formik.errors.email && formik.touched.email && (
                        <Typography color="error" variant="body2">
                            {formik.errors.email}
                        </Typography>
                    )}
                </Box>
                <Box>
                    <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                    <OutlinedInput
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        onChange={handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={Boolean(formik.errors.password && formik.touched.password)}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <Typography color="error" variant="body2">
                            {formik.errors.password}
                        </Typography>
                    )}
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel control={<CustomCheckbox defaultChecked />} label="Remeber this Device" />
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/auth/forgot-password"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main'
                        }}
                    >
                        Forgot Password ?
                    </Typography>
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
                    disabled={formik.isSubmitting}
                    startIcon={formik.isSubmitting && <CircularProgress size={20} color="inherit" />}
                >
                    {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthLogin;
