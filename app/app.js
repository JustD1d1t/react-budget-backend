import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { htmlRouter } from "./routes/html.js"

export const app = express()
app.use(cookieParser())
app.use(express.json({ limit: "2mb" }))

// app.use(function (req, res, next) {
// res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT" );
// res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// res.setHeader("Access-Control-Allow-Credentials", "true");
// next();
// });

const allowedOrigins = [
    "http://localhost:5173",
    "https://justd1d1t.github.io",
    "https://justd1d1t.github.io",
]

app.use(
    cors({
        origin: function (origin, callback) {
            // Sprawdzenie, czy pochodzenie znajduje się na liście dozwolonych lub jeśli nie ma pochodzenia (np. w przypadku zapytań z narzędzi takich jak Postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        credentials: true,
    })
)

app.options(
    "*",
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
    })
)

app.use("/html", htmlRouter)

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err)
})

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err)
})
app.get("*", function (req, res) {
    res.json({ message: "Request failed" })
})
