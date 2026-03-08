import { Router } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { Role } from "../entities/Role"
import { authorize } from "../middleware/authorize"
import { signToken } from "../utils/jwt"
import { ILike } from "typeorm"

const router = Router()

// ==================== RUTAS PÚBLICAS ====================

// Registro de cliente
router.post("/add-client", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const { firstName, lastName, age, phoneNumber, email, password, address, birthDate, dni, userName } = req.body

        if (!firstName || !lastName || !email || !password || !dni) {
            return res.status(400).json({ message: "Por favor complete todos los datos obligatorios." })
        }

        const existingUser = await userRepository.findOne({ where: [{ dni }, { email }] })
        if (existingUser) {
            return res.status(400).json({ message: "Ya existe un usuario con ese DNI o email." })
        }

        const user = userRepository.create({
            firstName, lastName, age, phoneNumber, email, password, address, birthDate, dni, userName,
            role: Role.CLIENT
        })
        await userRepository.save(user)

        return res.status(201).json({ message: "Cliente registrado correctamente.", client: user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Registro de profesional
router.post("/add-professional", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const { firstName, lastName, age, phoneNumber, email, password, address, birthDate, dni, userName,
                registrationNumber, specialty, yearsOfExperience } = req.body

        if (!firstName || !lastName || !email || !password || !dni || !specialty) {
            return res.status(400).json({ message: "Por favor complete todos los datos obligatorios." })
        }

        const existingUser = await userRepository.findOne({ where: [{ dni }, { email }] })
        if (existingUser) {
            return res.status(400).json({ message: "Ya existe un usuario con ese DNI o email." })
        }

        const user = userRepository.create({
            firstName, lastName, age, phoneNumber, email, password, address, birthDate, dni, userName,
            role: Role.PROFESSIONAL
        })
        await userRepository.save(user)

        return res.status(201).json({ message: "Profesional registrado correctamente.", professional: user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Login unificado
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Por favor ingrese email y contraseña." })
        }

        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." })
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta." })
        }

        const token = signToken({ id: user.id, email: user.email, role: user.role })

        return res.json({
            message: "Inicio de sesión exitoso.",
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Login por tipo (compatibilidad con frontend actual)
router.post("/login-client", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: "Por favor ingrese su email." })
        }

        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({ where: { email, role: Role.CLIENT } })

        if (!user) {
            return res.status(404).json({ message: "Cliente no encontrado." })
        }

        if (password && user.password !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta." })
        }

        const token = signToken({ id: user.id, email: user.email, role: user.role })
        return res.json({ message: "Inicio de sesión exitoso.", token, client: user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post("/login-professional", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: "Por favor ingrese su email." })
        }

        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({ where: { email, role: Role.PROFESSIONAL } })

        if (!user) {
            return res.status(404).json({ message: "Profesional no encontrado." })
        }

        if (password && user.password !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta." })
        }

        const token = signToken({ id: user.id, email: user.email, role: user.role })
        return res.json({ message: "Inicio de sesión exitoso.", token, professional: user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Búsqueda pública de profesionales
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query
        if (!q || typeof q !== "string") {
            return res.status(400).json({ message: "Por favor ingrese un término de búsqueda." })
        }

        const userRepository = AppDataSource.getRepository(User)
        const professionals = await userRepository.find({
            where: [
                { role: Role.PROFESSIONAL, firstName: ILike(`%${q}%`) },
                { role: Role.PROFESSIONAL, lastName: ILike(`%${q}%`) },
                { role: Role.PROFESSIONAL, specialty: ILike(`%${q}%`) },
                { role: Role.PROFESSIONAL, address: ILike(`%${q}%`) },
            ]
        })

        return res.json({ results: professionals })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// ==================== RUTAS PROTEGIDAS ====================

// Listar todos los usuarios (solo Admin)
router.get("/admin/users", authorize(Role.ADMIN), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()
        return res.json({ users })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Listar clientes (solo Admin)
router.get("/admin/clients", authorize(Role.ADMIN), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const clients = await userRepository.find({ where: { role: Role.CLIENT } })
        return res.json({ clients })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Listar profesionales (Admin y Client)
router.get("/professionals", authorize(Role.ADMIN, Role.CLIENT), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const professionals = await userRepository.find({ where: { role: Role.PROFESSIONAL } })
        return res.json({ professionals })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Eliminar usuario (solo Admin)
router.delete("/admin/users/:id", authorize(Role.ADMIN), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const result = await userRepository.delete(req.params.id)

        if (result.affected === 0) {
            return res.status(404).json({ message: "Usuario no encontrado." })
        }

        return res.json({ message: "Usuario eliminado correctamente." })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Actualizar perfil propio (cualquier usuario autenticado)
router.put("/profile", authorize(Role.ADMIN, Role.CLIENT, Role.PROFESSIONAL), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const { firstName, lastName, age, phoneNumber, address } = req.body

        await userRepository.update(req.user.id, { firstName, lastName, age, phoneNumber, address })
        const updated = await userRepository.findOne({ where: { id: req.user.id } })

        return res.json({ message: "Perfil actualizado correctamente.", user: updated })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Ver mi perfil (cualquier usuario autenticado)
router.get("/profile", authorize(Role.ADMIN, Role.CLIENT, Role.PROFESSIONAL), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({ where: { id: req.user.id } })

        return res.json({ user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

export { router }
