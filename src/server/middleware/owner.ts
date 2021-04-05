import { Request, Response, NextFunction } from "express";
import { Session } from '../../domain/sessions/types';
import { forbidden } from "../../app/responses";

type ownerId = 'personId' | 'userId';

export function createRequireOwnerMiddleware(paramName: ownerId) {
    return function requireOwnerMiddleware(req: Request, res: Response, next: NextFunction) {
        const session = res.locals.session as Session;
        
        const ownerId = session[paramName];

        const paramId = req.params[paramName];

        if(ownerId === paramId) {
            return next();
        }
        
        return forbidden(res, `You need to be the owner of this endpoint to create this request`)

    }
}
