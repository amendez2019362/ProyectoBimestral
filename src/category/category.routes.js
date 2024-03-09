import { Router } from "express";
import { check } from "express-validator";
import { categoryGet, categoryPost, getCategoryById, categoryPut, categoryDelete } from "./category.controller.js";
import { existCategoryById } from "../helpers/db-validator.js";
import { validateFields, actionRol, valCategory } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/", categoryGet);

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existCategoryById),
        validateFields,
    ], getCategoryById
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "This name is required").not().isEmpty(),
        actionRol,
        validateFields,
    ], categoryPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existCategoryById),
        actionRol,
        validateFields,
    ], categoryPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existCategoryById),
        actionRol,
        valCategory,
        validateFields,
    ], categoryDelete
);

export default router;