import { Router } from "express"
import { clientService } from "../services/ClientService"
import { clientService as professionalService } from "../services/ProfesionalService"

const router = Router()

// Registro
router.post("/add-client", async (req, res) => {
    try {
        const client = await clientService.create(req.body)
        return res.status(201).json({ message: "Cliente registrado correctamente.", client })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post("/add-professional", async (req, res) => {
    try {
        const professional = await professionalService.create(req.body)
        return res.status(201).json({ message: "Profesional registrado correctamente.", professional })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Login
router.post("/login-client", async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Por favor ingrese su email." })
        }
        const clients = await clientService.search(email)
        if (clients.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado." })
        }
        return res.json({ message: "Inicio de sesión exitoso.", client: clients[0] })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post("/login-professional", async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Por favor ingrese su email." })
        }
        const professionals = await professionalService.search(email)
        if (professionals.length === 0) {
            return res.status(404).json({ message: "Profesional no encontrado." })
        }
        return res.json({ message: "Inicio de sesión exitoso.", professional: professionals[0] })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Búsqueda
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query
        if (!q || typeof q !== "string") {
            return res.status(400).json({ message: "Por favor ingrese un término de búsqueda." })
        }
        const professionals = await professionalService.search(q)
        return res.json({ results: professionals })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

export { router }
