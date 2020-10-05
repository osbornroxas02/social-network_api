// **`/api/thoughts`**
const { User, Thought } = require('../models');

// `GET` to get all thought
const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err)
            )
    },

    // `GET` to get a single thought by its `_id`
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err)
            )
    },

    // `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'no user with that id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err))
    },

    // `PUT` to update a thought by its `_id`
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that id' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));

    },


    // `DELETE` to remove a thought by its `_id`
    deleteThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that id' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));

    },


    // **`/api/thoughts/:thoughtId/reactions`**
    // `POST` to create a reaction stored in a single thought's `reactions` array field
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that id' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    // `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;