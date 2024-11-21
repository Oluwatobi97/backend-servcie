import { NextFunction, Request, Response } from "express";
import { decrypt } from "../lib/jwt/jwt-sign";
import { UnAuthorized } from "../utils/appError";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      jwtPayload?: JwtPayload;
      cookiesAllowed: boolean;
    }
  }
}

const convertToJwtPayload = (token: string | null, req: Request, next: NextFunction) => {
  // Only proceed if token is not null
  if (token) {
    try {
      const jwtPayload = decrypt(token); // Assuming decrypt function handles errors internally
      if (!jwtPayload) {
        return next(new UnAuthorized("Invalid token payload"));
      }

      req.jwtPayload = jwtPayload; // Attach payload to the request
      return next(); // Continue to the next middleware
    } catch (error) {
      return next(new UnAuthorized("Failed to decrypt"));
    }
  }
  // Proceed to the next middleware without authentication if no token
  next();
};

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log("Cookies Allowed:", req.cookiesAllowed);

  try {
    let token = null;

    if (req.cookiesAllowed) {
      // Try to get token from cookies first
      token = req.cookies?.accessToken;
      console.log("Cookie Token:", token);
    }

    if (!token) {
      // If no token found in cookies, try to get from query string
      const authorizationToken = req.query?.token as string | undefined;
      if (authorizationToken) {
        token = authorizationToken.replace(/\\/g, "").slice(1, -1);
      }
      console.log("Query Token:", token);
    }

    // If token is still null, proceed to the next middleware without authentication
    if (!token) {
      return next(); // Allow the request to continue without authentication
    }

    // Otherwise, authenticate using the found token
    return convertToJwtPayload(token, req, next);

  } catch (error) {
    console.error("AuthGuard Error:", error);
    return next(new UnAuthorized("Authentication failed"));
  }
};
