import { Request, Response, NextFunction } from "express"
import { Role } from "../entities/Role"

// Extiende Request para incluir el usuario autenticado
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number
                email: string
                role: Role
            }
        }
    }
}

// Middleware que verifica que el usuario tenga uno de los roles permitidos
export function authorize(...allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "No autenticado." })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "No tiene permisos para realizar esta acción." })
        }

        next()
    }
}
