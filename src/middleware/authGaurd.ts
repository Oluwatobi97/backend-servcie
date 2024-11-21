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
    return next(new UnAuthorized("Token is missing or invalid"));
  }

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
    const authorizationToken = req.query?.token as string | undefined;
    if (authorizationToken) {
      // Remove extra characters if any (slashes, quotes)
      const token = authorizationToken.replace(/\\/g, "").slice(1, -1);
      console.log("Query Token:", token);

      return convertToJwtPayload(token, req, next);
    }

    // If no valid token is provided in cookies or query
    return next(new UnAuthorized("No token provided"));

  } catch (error) {
    // Catch any unexpected errors
    console.error("AuthGuard Error:", error);
    return next(new UnAuthorized("Authentication failed"));
  }
};
