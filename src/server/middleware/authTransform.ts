import { Request, Response, NextFunction } from "express";
import { checkExpirationStatus, decodeSession, encodeSession } from "../../domain/sessions";
import { DecodeResult, ExpirationStatus, Session } from "../../domain/sessions/types";

/**
 * Transforms auth cookies into proper token
 */
export function authTransformMiddleware(req: Request, res: Response, next: NextFunction) {
    const headerPayloadPart = req.cookies['header.payload']
    const signaturePart = req.cookies['signature'];

    if(headerPayloadPart && signaturePart) {
        req.headers['X-JWT-Token'] = `${headerPayloadPart}.${signaturePart}`;
    }
    

    next();
}
