const moment = require('moment');
const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought');


const reactionSchema = new Schema(
    { //(SCHEMA ONLY)
        reactionId: {
            //Use Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            //Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: 'Username is Required',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },

    });

//Schema Setting: This will not be a model, but rather used as the `reaction` field's subdocument schema in the `Thought` model.*/
module.exports = reactionSchema;