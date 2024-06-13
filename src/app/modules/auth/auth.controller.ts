import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const login = catchAsync(async (req, res) => {
    const { accessToken, refreshToken, needsPasswordChange } =
        await AuthServices.login(req.body);

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Successfully logged in!',
        data: { accessToken, needsPasswordChange },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Successfully retrieved refresh token!',
        data: result,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const result = await AuthServices.changePassword(req.user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Password changed successfully!',
        data: result,
    });
});

export const AuthControllers = {
    login,
    refreshToken,
    changePassword,
};
