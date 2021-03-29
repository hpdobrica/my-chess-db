import { Request, Response, NextFunction } from "express";
import { forbidden } from "../../app/responses";

export function requireAdminMiddleware(req: Request, res: Response, next: NextFunction) {

    // temporary until admin is implemented later on
    forbidden(res, `You don't have the permissions to access this endpoint`);
    return;

}
