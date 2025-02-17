import { ApiError } from "./ApiError";

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    throw new ApiError(500, error.message);

    // res.status(error.statusCode || 500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};

export { asyncHandler };
