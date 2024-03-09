import { Router } from "express";
import { check } from "express-validator";
import { userGet, userPost, getUserById, userPut, userDelete } from "./user.controller.js";
import { existEmail, validRole, existUserById } from "../helpers/db-validator.js";
import { validateFields, validateRol, valDeleteUser } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/",
    userGet
);

router.get(
    "/:id",
    [
        check("id", "Invalid id").isMongoId(),
        check("id").custom(existUserById),
        validateFields,
    ], getUserById
);

router.post(
    "/",
    [
        check("name", "The name is required").not().isEmpty(),
        check("password", "The password must be greater than 6 characters").isLength({ min: 6 }),
        check("email", "The email is not valid").isEmail(),
        check("email").custom(existEmail),
        validateFields,
    ], userPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid id").isMongoId(),
        check("id").custom(existUserById),
        check("password", "The password must be greater than 6 characters").isLength({ min: 6 }),
        check("role").custom(validRole),
        validateRol,
        validateFields,
    ], userPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid id").isMongoId(),
        check("id").custom(existUserById),
  
        validateRol,
        valDeleteUser,
        validateFields,
    ], userDelete
);

export default router;