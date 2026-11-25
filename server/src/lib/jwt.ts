import jwt from "jsonwebtoken";
import { env } from "./env.js";

export type JwtPayload = {
  sub: string;
  email: string;
};

export function signOwnerToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyOwnerToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (typeof decoded === "string" || !decoded.sub || !decoded.email) {
    throw new Error("Invalid token payload");
  }
  return {
    sub: String(decoded.sub),
    email: String(decoded.email),
  };
}
