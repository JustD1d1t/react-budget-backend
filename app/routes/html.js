import express from "express"
import { HtmlController } from "../controllers/HtmlController.js"

export const htmlRouter = new express.Router()

htmlRouter.get("/", HtmlController.getHtml)