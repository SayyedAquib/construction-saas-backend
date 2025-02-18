import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please provide all fields");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User with email is already exists");
  }

  const user = await User.create({ name, email, password });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User not registered");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
