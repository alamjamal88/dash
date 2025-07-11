//===============|| ERROR HANDLER ||=====================//
export const errorHandler = (error: any) => {
    const { request, response } = error;
    if (response) {
        // const {message}  =error;
        const status = response.status;
        const message = response.data.message;
        return {
            message,
            status
        };
    } else if (request) {
        //request sent but no response received
        return {
            message: 'Something went wrong while Setting up request',
            status: 503
        };
    } else {
        // Something happened in setting up the request that triggered an Error
        return {
            message: error.code === 'ERR_CANCELED' ? null : 'Something went wrong while setting up request',
            status: 500
        };
    }
};
