import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { Request, Response, NextFunction } from "express";
import {
  handleForbiddenResponse,
  handleUnauthorizedResponse,
} from "../utils/handleResponse.js";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

interface AuthorizeOptions {
  roles: string[];
  matchUserId?: boolean;
}

interface AuthenticatedUser extends JwtPayload {
  role: string;
  id: string;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  const token =
    typeof authorizationHeader === "string"
      ? authorizationHeader.split(" ")[1]
      : undefined;

  if (!token) {
    return handleUnauthorizedResponse(res, "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    handleUnauthorizedResponse(res, "Invalid token.");
  }
};

export const authorize = ({ roles, matchUserId = false }: AuthorizeOptions) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return handleUnauthorizedResponse(
        res,
        "Access denied. Not authenticated."
      );
    }

    const user = req.user as AuthenticatedUser;

    if (!roles.includes(user.role)) {
      return handleForbiddenResponse(
        res,
        "Access denied. You do not have permission to access this resource."
      );
    }

    if (matchUserId && user.id !== req.params.userId) {
      return handleForbiddenResponse(
        res,
        "Access denied. You do not have permission to access this profile."
      );
    }

    next();
  };
};
