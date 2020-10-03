// **`/api/thoughts`**
const { User, Thought } = require('../models');

// `GET` to get all thought
const thoughtController = {

    // TODO add getAllThoughts

    getAllThought(req, res) {
        console.log(body);
        Thought.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // `GET` to get a single thought by its `_id`
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    createThought(req, res) {
        Thought.create(req.body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    //{ user: req.body.username },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Thought created but no user found with this id!' });
                    return;
                }
                res.json({ message: 'Thought successfully created!' });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // `PUT` to update a thought by its `_id`
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // `DELETE` to remove a thought by its `_id`
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }


    // **`/api/thoughts/:thoughtId/reactions`**
    // `POST` to create a reaction stored in a single thought's `reactions` array field
    // `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
};

module.exports = thoughtController;