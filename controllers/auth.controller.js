import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN } from '../config/env.js';

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const userExists = await User
            .findOne({ email })
            .session(session);
        if (userExists) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create(
            [{ name, email, password: hashedPassword }],
            { session }
        );

        const token = jwt.sign(
            { _id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        await session.commitTransaction();
        session.endSession();
        res.status(201).send({
            success: true,
            message: 'User created successfully',
            data: { user: newUser, token }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signin = (req, res) => {
    res.send({
        title: 'Sign-in',
        message: 'Sign-in route',
    });
};

export const signout = (req, res) => {
    res.send({
        title: 'Sign-out',
        message: 'Sign-out route',
    });
};

// The signup function is an asynchronous function that creates a new user and saves it to the database. If the operation is successful, it sends a response with the user object and a status code of 201. If an error occurs, it sends a response with the error object and a status code of 400.