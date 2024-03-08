import { response, request } from "express";
import Product from './product.model.js';

export const productGet = async (req = request, res = response) => {

    const { limit, from } = req.query;
    const query = { state: true };
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        products
    });
}

export const soldOutProduct = async (req, res) => {
    try {

        const outOfStock = await Product.findProductSoldOut();

        res.status(200).json({
            total: outOfStock.length,
            outOfStock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getMaxSaleProduct = async (req, res) => {
    try {

        const maxSaleProduct = await Product.find().sort({ quantitySold: -1 });

        res.status(200).json({
            total: maxSaleProduct.length,
            maxSaleProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        product
    });
}

export const productsPost = async (req, res) => {

    const { name, price, quantityStock, quantitySold, category } = req.body;
    const product = new Product({ name, price, quantityStock, quantitySold, category });

    await product.save();

    res.status(200).json({
        product
    });

}

export const productsPut = async (req, res) => {

    const { id } = req.params;
    const { _id, state, ...rest } = req.body;

    await Product.findByIdAndUpdate(id, rest);
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        msg: 'Product Updated Successfully',
        product
    });
}

export const productDelete = async (req, res) => {
    const { id } = req.params;

    await Product.findByIdAndUpdate(id, { state: false });
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        msg: 'Product Delete Successfully',
        product
    });
}