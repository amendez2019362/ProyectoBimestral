import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { invoicesGetByUser, generateInvoice, invoiceGetById, invoiceUpdate, invoiceDelete } from "./factura.controller.js";
import { validateRol } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    "/",
    validateJWT,
    generateInvoice
);

router.get(
    "/:userId",
    validateJWT,
    invoicesGetByUser
);


router.get(
    "/:id",
    validateJWT,
    validateRol,
    invoiceGetById
);

router.put(
    "/:id",
    validateJWT,
    validateRol,
    invoiceUpdate
);

router.delete(
    "/:id",
    validateJWT,
    validateRol,
    invoiceDelete);

export default router;