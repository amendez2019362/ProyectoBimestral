import { Router } from "express";
import { check } from "express-validator";
import { productGet, productPost, getProductById, productPut, productDelete, soldOutProduct, getMaxSaleProduct, searchCategoryProduct, searchNameProduct } from "./product.controller.js";
import { existProductById, } from "../helpers/db-validator.js";
import { validateFields, validateRol } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/",
    validateJWT,
    productGet
);

router.get(
    "/productOutOfStock",
    validateJWT,
    validateRol,
    soldOutProduct
);

router.get(
    "/:bestSellingProduct",
    getMaxSaleProduct
);

router.get(
    "/searchProductName/:name",
    searchNameProduct
);

router.get(
    "/searchProductCategory/:categoryName",
    searchCategoryProduct
);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existProductById),
        validateRol,
        validateFields,
    ], getProductById
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "This name is obligatory").not().isEmpty(),
        validateRol,
        validateFields,
    ], productPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existProductById),
        validateRol,
        validateFields,
    ], productPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existProductById),
        validateRol,
        validateFields,
    ], productDelete
);

export default router;