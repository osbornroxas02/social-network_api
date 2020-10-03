// **`/api/users`**
const { User } = require('../models');

//`GET` all users
const userController = {
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thought',//from /routes/api/index.js?
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

    //`GET` a single user by its `_id` and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thought',// + friend?
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //`POST` a new user:
    createUser({ body }, res)  {
        User.create(body)//({ name: 'Ernest Hemingway' })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //`PUT` to update a user by its `_id`
    updateUser({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //`DELETE` to remove user by its `_id`
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

    // **BONUS**: Remove a user's associated thoughts when deleted
    // **/`/api/users/:userId/friends/:friendId`**
    // `POST` to add a new friend to a user's friend list
    // `DELETE` to remove a friend from a user's friend list
};

module.exports = userController;