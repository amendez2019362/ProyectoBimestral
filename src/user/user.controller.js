import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userGet = async (req = request, res = response) => {

    const { limit, from } = req.query;
    const query = { state: true };
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        users
    });
}

export const userPost = async (req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    console.log(user);
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(200).json({
        msg: 'User was added successfully',
        user
    });
}

export const getUserById = async (req, res) => {

    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        user
    })
}

export const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, email, state, ...rest } = req.body;
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(rest.password, salt);

    await User.findByIdAndUpdate(id, rest);

    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'User updated',
        user
    });
}

export const userDelete = async (req, res) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    const validUserDelete = req.user;

    res.status(200).json({ msg: 'This user has been deleted', user, validUserDelete });
}