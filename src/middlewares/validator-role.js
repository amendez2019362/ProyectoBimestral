import { request, response } from "express";


export const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res
                .status(500)
                .json({
                    msg: "You want to verify a rolex without validating the token first",
                });
        }

        if (!roles.includes(req.usuario.role)) {
            return res
                .status(401)
                .json({
                    msg: `The service requires one of the following authorized roles ${roles}`,
                });
        }

        next();
    }
}