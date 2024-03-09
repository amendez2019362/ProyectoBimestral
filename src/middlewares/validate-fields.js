import { validationResult } from "express-validator";
import Category from '../category/category.model.js';
import Product from '../product/product.model.js';

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
    };

    if (userRole === 'CLIENT_ROLE') {
        if (role && role !== req.user.role) {
            return res.status(403).json({ msg: 'You cant update your rol' });
        }
    };

    next();
}

export const actionRol = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 'CLIENT_ROLE') {
        return res.status(403).json({ msg: 'You are not an admin to perform this action.' });
    };

    next();

}

export const valCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        };

        const defaultCategory = await Category.findOne({ name: 'Default' });

        if (!defaultCategory) {
            return res.status(404).json({ msg: 'Default category not found' });
        };

        await Product.updateMany({ category: id }, { category: defaultCategory._id });

        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}

export const valDeleteUser = async (req, res, next) => {
    
    const { id } = req.params;
    const { password } = req.body;

    try {

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ 
                error: "User not found" 
            });
        }

        console.log("this password was received:", password);
        console.log("this password was stored:", user.password);

        const validPasswordUser = await bcryptjs.compare(password, user.password);

        if (!validPasswordUser) {
            return res.status(401).json({
                error: "Invalid password" 
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
};