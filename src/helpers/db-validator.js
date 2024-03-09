import User from '../user/user.model.js';
import Category from '../category/category.model.js';
import Product from '../product/product.model.js';

export const validRole = async (role = '') => {
    const existRol = await User.findOne({role});
    if (!existRol){
        throw new Error(`El role ${role} no existe en la base datos`);
    }
};

export const existEmail = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} has already been registered`);
    }
};

export const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The ID: ${id} does not exist`);
    }
};

export const existCategoryById = async (id = '') => {
    const existCategory = await Category.findById(id);
    if(!existCategory){
        throw new Error(`The ID: ${id} does not exist`);
    }
};

export const existProductById = async (id = '') => {
    const existProduct = await Product.findById(id);
    if(!existProduct){
        throw new Error(`The ID: ${id} does not exist`);
    }
}

export const existCartById = async (id = '') => {
    const existCart = await Cart.findById(id);
    if(!existCart){
        throw new Error(`The ID: ${id} does not exist`);
    };
}
