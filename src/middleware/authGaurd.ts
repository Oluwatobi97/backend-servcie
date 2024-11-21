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
  if (!token) return next(new UnAuthorized("Token is missing or invalid"));

  try {
    const jwtPayload = decrypt(token); // Your decryption logic here
    if (jwtPayload) {
      req.jwtPayload = jwtPayload;
      return next();
    } else {
      return next(new UnAuthorized("Invalid token payload"));
    }
  } catch (error) {
    return next(new UnAuthorized("Error processing token"));
  }
};

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Cookies Allowed:", req.cookiesAllowed);

    // Handle cookie-based token
    if (req.cookiesAllowed) {
      const cookieToken = req.cookies?.accessToken;
      console.log("Cookie Token:", cookieToken);
      return convertToJwtPayload(cookieToken, req, next);
    }

    // Handle query-based token
    const authorizationToken = req.query?.token as string;
    const token = authorizationToken
      ? authorizationToken.replace(/\\/g, "").slice(1, -1)
      : null;
    console.log("Query Token:", token);
    return convertToJwtPayload(token, req, next);
  } catch (error) {
    return next(error);
  }
};
