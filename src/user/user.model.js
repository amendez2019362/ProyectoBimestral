import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "This parameter is required"],
    },
    email: {
        type: String,
        required: [true, "This parameter is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "The password is required"],
    },
    role: {
        type: String,
        enum: ['CLIENT_ROLE', 'ADMIN_ROLE'],
        default: 'CLIENT_ROLE'
    },
    state: {
        type: Boolean,
        default: true,
    },
});

userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', userSchema);