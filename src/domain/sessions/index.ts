import * as jwt from "jsonwebtoken";
import {config} from '../../app/config';
import { DecodeResult, EncodeResult, ExpirationStatus, PartialSession, Session } from "./types";

export function encodeSession(partialSession: PartialSession): EncodeResult {

    // Always use HS512 to sign the token
    const algorithm: jwt.Algorithm = "HS512";

    // Determine when the token should expire
    const issued = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const session: Session = {
        ...partialSession,
        issued: issued,
        expires: expires
    };

    return {
        // todo: make async
        token: jwt.sign(session, config.JWT_SECRET, {algorithm}),
        issued,
        expires
    }

}

export function decodeSession(tokenString: string): DecodeResult {
    // Always use HS512 to decode the token
    const algorithm: jwt.Algorithm = "HS512";

    let result: Session;
    
    try {
        // todo: make async
        result = jwt.verify(tokenString, config.JWT_SECRET, { algorithms: [algorithm]}) as Session
    } catch (_e) {
        const e: Error = _e;

        if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError' || e.name === 'NotBeforeError') {
            return {
                type: "invalid-token"
            };
        }

        throw e;
    }

    return {
        type: "valid",
        session: result
    }
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now();
    
    if (token.expires > now) return "active";

    // Find the timestamp for the end of the token's grace period
    const graceLengthInMs = 15 * 60 * 1000;
    const gracePeriodInMs = token.expires + graceLengthInMs;

    if (gracePeriodInMs > now) return "grace";

    return "expired";
}