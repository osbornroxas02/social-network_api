// **`/api/users`**
const { User } = require('../models');

//`GET` all users
const userController = {
    getAllUser(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //`GET` a single user by its `_id` and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // include thought data
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => {
                //if no user found
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that id' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //`POST` a new user:
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                res.status(400).json(err)
            });
    },

    //`PUT` to update a user by its `_id`
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err))
    },
    //`DELETE` to remove user by its `_id`
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that id' });
                    return;
                }
                Thought.remove({ username: this.username }).exec(); //remove associated thoughts
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // **BONUS**: Remove a user's associated thoughts when delete: /api/users/:userId/friends/:friendId`**

    // `POST` to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // `DELETE` to remove a friend from a user's friend list
    //remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.json(err));

    }
};

module.exports = userController;