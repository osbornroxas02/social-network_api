const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You need to leave a thought!',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: 'Password is required',
            minlength: 6
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

//Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;