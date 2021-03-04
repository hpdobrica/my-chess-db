import { Request, Response, NextFunction } from "express";
import { checkExpirationStatus, decodeSession, encodeSession } from "../../domain/sessions";
import { DecodeResult, ExpirationStatus, Session } from "../../domain/sessions/types";

/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
export function requireAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const unauthorized = (message: string) => res.status(401).json({
        ok: false,
        status: 401,
        message: message
    });

    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = req.header(requestHeader);
    
    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }

    let decodedSession: DecodeResult
    try{
        decodedSession = decodeSession(header);
    } catch(_e) {
        const e: Error = _e
        unauthorized(`Unexpected error: ${e.message}`)
    }
     
    
    if (decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === "expired") {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }

    let session: Session;

    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const { token, expires, issued } = encodeSession(decodedSession.session);
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        };

        res.setHeader(responseHeader, token);
    } else {
        session = decodedSession.session;
    }

    // Set the session on response.locals object for routes to access
    res.locals = {
        ...res.locals,
        session: session
    };

    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}
