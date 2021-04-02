import { Request, Response, NextFunction } from "express";
import { Session } from '../../domain/sessions/types';
import { forbidden } from "../../app/responses";

export function requireOwnerMiddleware(req: Request, res: Response, next: NextFunction) {

    next();
    return;
    const params = Object.keys(req.params).map((paramKey) => {
        return req.params[paramKey]
    })



    const session = res.locals.session as Session

    // todo not working, probably have to parse req.originalUrl, 
    // should pass and arg to this mw so he can know what to check
    console.log(req, session);

    // todo check security of this
    const isOwner = params.some((param) => {
        return param === session.personId || param === session.userId
    })  

    if(!isOwner) {
        return forbidden(res, `You need to be the owner of this endpoint to create this request`)
    }
    
    return;

}
