import { Router } from "express";
import { check } from "express-validator";
import { cartDelete, cartGet, cartPut, getCartById, newCart } from "./cart.controller.js";
import { existCartById } from "../helpers/db-validator.js";
import { validateFields, validateRol } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/",
    cartGet
);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existCartById),
        validateRol,
        validateFields,
    ], getCartById
);

router.post(
    "/add-to-cart",
    [
        validateJWT,
        check("userId", "User ID is required").not().isEmpty(),
        check("productId", "Product ID is required").notEmpty(),
        check("quantity", "Quantity is required").isInt({ min: 1 }),
        validateFields,
    ], newCart
);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existCartById),
        validateFields,
    ], cartPut
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existCartById),
        validateFields,
    ], cartDelete
);

export default router;