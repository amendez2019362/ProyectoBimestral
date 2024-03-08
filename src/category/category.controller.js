import { response, request } from "express";
import Category from './category.model.js';

export const categoryGet = async (req = request, res = response) => {

    const { limit, from } = req.query;
    const query = { state: true };
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        categories
    });
}

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        category
    });
}

export const categoryPost = async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name });

    await category.save();

    res.status(200).json({
        msg: 'New category added',
        category
    });

}

export const categoryPut = async (req, res) => {
    const { id } = req.params;
    const { _id, state, ...rest } = req.body;

    await Category.findByIdAndUpdate(id, rest);
    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        msg: 'Category Updated Successfully',
        category
    });
}

export const categoryDelete = async (req, res) => {
    const { id } = req.params;

    await Category.findByIdAndUpdate(id, { state: false });
    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        msg: 'Category Delete Successfully',
        category
    });
}