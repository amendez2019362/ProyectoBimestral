import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }

    next();
}

export const validateRol = (req, res, next) => {

    const { id } = req.params;
    const { role } = req.body;
    const userRole = req.user.role;

    if (userRole === 'CLIENT_ROLE' && req.user.id !== id) {
        return res.status(403).json({ msg: 'You can only edit or delete your data' });
    }

    if (userRole === 'CLIENT_ROLE') {
        if (role && role !== req.user.role) {
            return res.status(403).json({ msg: 'You cant update your rol' });
        }
    }

    next();

}