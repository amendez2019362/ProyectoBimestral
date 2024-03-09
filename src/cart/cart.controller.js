import { response, request } from "express";
import Cart from './cart.model.js';
import User from '../user/user.model.js';
import Product from '../product/product.model.js';

export const cartGet = async (req = request, res = response) => {

    try {

        const carts = await Cart.find();

        res.status(200).json({
            carts
        }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const newCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const userFromToken = req.user;
        if (userId !== userFromToken._id.toString()) {
            return res.status(401).json({
                error: "You need an authorization. You can only add products to the cart"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        if (product.quantityStock < quantity) {
            return res.status(400).json({
                error: "Insufficient stock"
            });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.equals(productId));

        if (existingItemIndex !== -1) {

            cart.items[existingItemIndex].quantity += quantity;

        } else {
            cart.items.push({
                product: productId,
                quantity
            });
        }

        cart.totalPrice += product.price * quantity;

        await cart.save();

        res.status(200).json({
            message: "Product added to cart"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const getCartById = async (req, res) => {
    try {

        const { id } = req.params;
        const cart = await Cart.findById(id);

        if (!cart) {
            return res.status(404).json({
                msg: 'Cart not found'
            });
        }

        res.status(200).json({
            cart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const cartPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, items, totalPrice } = req.body;
        const updatedCart = await Cart.findByIdAndUpdate(id, { userId, items, totalPrice }, { new: true });

        res.status(200).json({
            msg: 'Cart updated successfully',
            cart: updatedCart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const cartDelete = async (req, res) => {
    try {

        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'Cart deleted successfully',
            cart: deletedCart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}