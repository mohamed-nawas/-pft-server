import { PFTException } from "../exceptions/PFTException";

const fs = require('fs');
const jwt = require('jsonwebtoken');

/**
 * Jwt service
 */
const getPrivateKey = (): string => {
    if (process.env.ENVIRONMENT === 'DEVELOPMENT') return fs.readFileSync('api/keys/private.key', 'utf-8');
    if (process.env.ENVIRONMENT === 'PRODUCTION') {
        const base64key = process.env.PRIVATE_KEY_B64;
        if (!base64key) throw new PFTException('PRIVATE_KEY_B64 environment variable is not set');
        return Buffer.from(base64key, 'base64').toString('utf-8');
    };
    throw new PFTException('The enviroment is not valid to generate RSA keys');
}

const getPublicKey = (): string => {
    if (process.env.ENVIRONMENT === 'DEVELOPMENT') return fs.readFileSync('api/keys/public.key', 'utf-8');
    if (process.env.ENVIRONMENT === 'PRODUCTION') {
        const base64key = process.env.PUBLIC_KEY_B64;
        if (!base64key) throw new PFTException('PUBLIC_KEY_B64 environment variable is not set');
        return Buffer.from(base64key, 'base64').toString('utf-8');
    };
    throw new PFTException('The enviroment is not valid to generate RSA keys');
}

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
        return jwt.sign(payload, getPrivateKey(), signOptions);
    } catch (e) {
        console.error(e);
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
        return jwt.verify(token, getPublicKey(), verifyOptions);
    } catch (e) {
        console.error(e);
        throw new PFTException("Jwt verification failed", e as Error);
    }
}