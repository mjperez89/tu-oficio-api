import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

// Middleware de autenticación via JWT
// El token se envia en el header: Authorization: Bearer <token>
export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"]

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next() // Rutas públicas pasan sin token
    }

    const token = authHeader.split(" ")[1]

    try {
        const payload = verifyToken(token)
        req.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role
        }
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado." })
    }

    next()
}
