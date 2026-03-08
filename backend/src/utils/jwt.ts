import * as jwt from "jsonwebtoken"
import { Role } from "../entities/Role"

const JWT_SECRET = process.env.JWT_SECRET || "tu-oficio-secret-key"
const JWT_EXPIRES_IN = "24h"

export interface JWTPayload {
    id: number
    email: string
    role: Role
}

export function signToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JWTPayload {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
}
