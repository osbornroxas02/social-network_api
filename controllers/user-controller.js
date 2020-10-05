// **`/api/users`**
const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get single user by ID
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

    //create new user
    addNewUser({body},res) {
        User.create(body)
        .then(userData =>res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    //update user by id
    updateUser({params, body},res) {
        User.findOneAndUpdate(
            {_id:params.id},
            body,
            {new:true, runValidators: true}
            )
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'No user with that id'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err))
    },
    //delete a user by id
    deleteUser({params},res) {
        User.findOneAndDelete({_id:params.id})
        .then(userData =>{
            if(!userData){
                res.status(404).json({message:'No user with that id'});
                return;
            }
            Thought.remove({username:this.username}).exec(); //remove associated thoughts
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    //add new friend
    addFriend({params},res){
        User.findOneAndUpdate(
            { _id:params.userId },
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'No user with that id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));

    },
    //remove a friend
    removeFriend({params},res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull:{friends: params.friendId}},
            {new :true}
        )
        .then(userData => res.json(userData))
        .catch(err => res.json(err));

    }
}

module.exports = userController;