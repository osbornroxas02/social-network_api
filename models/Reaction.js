const moment = require('moment');
const { Schema, Types } = require('mongoose');
const thought = require('./Thought');


const reactionSchema = new Schema(
    {
        reactionId: {
            //Use Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            //Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        },
    }
);

//Schema Setting: This will not be a model, but rather used as the `reaction` field's subdocument schema in the `Thought` model.*/
module.exports = reactionSchema;