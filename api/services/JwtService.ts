import { PFTException } from "@exceptions/PFTException";

const fs = require('fs');
const jwt = require('jsonwebtoken');

/**
 * Jwt service
 */
var PRIVATE_KEY = fs.readFileSync('src/keys/private.key', 'utf8');
var PUBLIC_KEY = fs.readFileSync('src/keys/public.key', 'utf8');

export const TOKEN_ISSUER = 'Computic Solutions';
export const TOKEN_SUBJECT = 'Auth token';
export const TOKEN_AUDIENCE = 'Client_Identity';

interface JwtSignVerifyOptions {
    issuer: string;
    subject: string;
    audience: string;
}

export function sign(payload: any, $Option: JwtSignVerifyOptions): boolean {
    var signOptions = {
        issuer: $Option.issuer,
        subject: $Option.subject,
        audience: $Option.audience,
        expiresIn: '1h',
        algorithm: 'RS256'
    };

    try {
        return jwt.sign(payload, PRIVATE_KEY, signOptions);
    } catch (e) {
        throw new PFTException("Jwt sign in failed", e as Error);
    }
}

export function verify(token: string, $Option: JwtSignVerifyOptions): boolean {
    var verifyOptions = {
        issuer: $Option.issuer,
        subject: $Option.subject,
        audience: $Option.audience,
        expiresIn: '1h',
        algorithm: ['RS256']
    };

    try {
        return jwt.verify(token, PUBLIC_KEY, verifyOptions);
    } catch (e) {
        throw new PFTException("Jwt verification failed", e as Error);
    }
}