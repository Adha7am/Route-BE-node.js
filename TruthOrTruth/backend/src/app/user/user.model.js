import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () { return this.provider === 'local' }
    },
    provider: {
        type: String,
        enum: ['google', 'local', 'instagram'],
        default: 'local'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    dob: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'unknown'],
        default: 'unknown'
    }
}, {
    timestamps: true
});

//remove the password field whenever the user document is parsed
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        return ret
    }
})

const User = model('User', userSchema);

export default User