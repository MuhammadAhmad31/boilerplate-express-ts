import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../../utils/handleResponse";
import { findUserByUsername } from "../../models/user.model";
import { JWT_SECRET } from "../../config/env";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return handleErrorResponse(res, "Username and password are required.");
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) return handleErrorResponse(res, "Invalid username or password.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return handleErrorResponse(res, "Invalid username or password.");

    if (!JWT_SECRET) {
      return handleErrorResponse(res, "JWT secret is not defined.");
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role?.name,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    handleSuccessResponse(res, "Login successful.", {
      token,
    });
  } catch (error) {
    handleErrorResponse(res, "Login failed.");
  }
};
