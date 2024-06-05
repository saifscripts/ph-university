import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result =
        await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
            req.body,
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Semester registration created successfully!',
        data: result,
    });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
    const result =
        await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(
            req.query,
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Semester registrations fetched successfully!',
        data: result,
    });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
            id,
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Semester registration fetched successfully!',
        data: result,
    });
});

// const updateSemesterRegistration = catchAsync(async (req, res) => {
//     const { id } = req.params;

//     const updatedSemesterRegistration = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         message: 'SemesterRegistration updated successfully!',
//         data: updatedSemesterRegistration,
//     });
// });

export const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    // updateSemesterRegistration,
};
