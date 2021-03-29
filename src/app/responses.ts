import { Response } from "express";

export const unauthorized = (res: Response, message: any) =>
  res.status(401).json({
    ok: false,
    status: 401,
    message: message,
  });

export const forbidden = (res: Response, message: any) =>
  res.status(403).json({
    ok: false,
    status: 403,
    message: message,
  });


