import * as express from "express"
import * as cors from "cors"
import * as path from "path"
import { router } from "./routes/routes"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

// Servir frontend buildeado en producción
const frontendBuildPath = path.join(__dirname, "../../frontend/build")
app.use(express.static(frontendBuildPath))

// Cualquier ruta que no sea API, servir el index.html de React
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"))
})

export { app }
