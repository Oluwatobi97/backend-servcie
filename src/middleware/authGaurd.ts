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
  if (!token) {
    // Gracefully exit if token is null or undefined
    return next(new UnAuthorized("Token is missing or invalid"));
  }

  try {
    const jwtPayload = decrypt(token); // Replace with your decryption logic
    if (jwtPayload) {
      req.jwtPayload = jwtPayload; // Attach payload to the request
      return next(); // Continue to the next middleware
    } else {
      return next(new UnAuthorized("Invalid token payload"));
    }
  } catch (error) {
    return next(new UnAuthorized("Error processing token"));
  }
};

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log("Cookies Allowed:", req.cookiesAllowed);

  try {
    if (req.cookiesAllowed) {
      // Handle token from cookies
      const cookieToken = req.cookies?.accessToken;
      console.log("Cookie Token:", cookieToken);
      return convertToJwtPayload(cookieToken, req, next);
    }

    // Handle token from query string
    const authorizationToken = req.query?.token as string;
    const token = authorizationToken
      ? authorizationToken.replace(/\\/g, "").slice(1, -1)
      : null;

    console.log("Query Token:", token);
    return convertToJwtPayload(token, req, next);
  } catch (error) {
    // Catch any unexpected errors
    console.error("AuthGuard Error:", error);
    return next(new UnAuthorized("Authentication failed"));
  }
};
