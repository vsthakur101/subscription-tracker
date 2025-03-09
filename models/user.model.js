import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name can not exceed 32 characters"],
        minLength: [3, "Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"],
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

// The above code defines a user schema with name, email, and password fields. The name and email fields are required, and the email field must be unique. The password field must be at least 6 characters long. The timestamps option is set to true, which will automatically add createdAt and updatedAt fields to the document.