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
  if (token) {
    try {
      const jwtPayload = decrypt(token); // Assuming decrypt function handles errors internally
      if (!jwtPayload) {
        return next(new UnAuthorized("Invalid token payload"));
      }

      req.jwtPayload = jwtPayload; // Attach payload to the request
      return next(); // Continue to the next middleware
    } catch (error) {
      return next(new UnAuthorized("Failed to decrypt token"));
    }
  }
  return next(); // Proceed if no token
};

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log("Cookies Allowed:", req.cookiesAllowed);

  try {
    let token = null;
    let tokenFound = false;

    if (req.cookiesAllowed) {
      // Try to get token from cookies first
      token = req.cookies?.accessToken;
      console.log("Cookie Token:", token);
      if (token) {
        tokenFound = true;
      }
    }

    if (!token) {
      // If no token found in cookies, try to get from query string
      const authorizationToken = req.query?.token as string | undefined;
      if (authorizationToken) {
        token = authorizationToken.replace(/\\/g, "").slice(1, -1);
        tokenFound = true;
      }
      console.log("Query Token:", token);
    }

    // If no token was found, allow the request to continue without setting the payload
    if (!tokenFound) {
      return next(); // Continue without authentication if no token
    }

    // Otherwise, authenticate using the found token
    return convertToJwtPayload(token, req, next);

  } catch (error) {
    console.error("AuthGuard Error:", error);
    return next(new UnAuthorized("Authentication failed"));
  }
};
