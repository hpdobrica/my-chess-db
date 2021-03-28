import { Request, Response, NextFunction } from "express";

export function requireAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    const forbidden = (message: string) => res.status(401).json({
        ok: false,
        status: 403,
        message: message
    });

    // temporary until admin is implemented later on
    forbidden(`You don't have the permissions to access this endpoint`);
    return;

}
