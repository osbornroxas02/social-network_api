const moment = require('moment');
const { Schema, model } = require('mongoose');

//create the user schema
const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: 'Username required',
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        //Array of `_id` values referencing the `Thought` model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        //Array of `_id` values referencing the `User` model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false

    });

//a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query?
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

//create a user model using the userSchema
const User = model('User', userSchema);
//export the user model
module.exports = User;