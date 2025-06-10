import { ErrorResponse } from '../common.type';

export interface UserData {
    user: {
        address: {
            pinCode: string;
            localAddress: string;
            district: string;
            state: string;
        };
        roles: string;
        name: string;
        mobile: string;
        isNewUser: boolean;
        isApproved: boolean;
        isActivate: boolean;
        userDP: string;
        firebase: string[]; // Assuming firebase is an array of strings
        id: string;
    };
    passCode: string;
    loginWith: string;
}

export interface UserState {
    isLoading: boolean;
    error: ErrorResponse | null;
    UserData: UserData[] | null;
}
