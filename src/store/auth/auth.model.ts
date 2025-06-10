import { ErrorResponse } from '../common.type';

export type tokenUserData = {
    uid: string;
    role: string;
    mobile: string;
};
export type AuthState = {
    isLoading: boolean;
    error: ErrorResponse | null;
    token: string | null;
    passCode: string | null;
    loginDetail: LoginResponse | null;
    isAuthenticated: boolean;
    loginDetailFirebase: Record<string, unknown> | null;
    otpResponse: OtpResponse | null;
    UserData: tokenUserData | null;
};

export type LoginResponse = {
    refreshToken: string;
    passCode: string;
    [key: string]: unknown;
};

export type OtpResponse = {
    code: string;
    expiresAt: string;
};
