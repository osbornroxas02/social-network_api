const router = require('express').Router();

// import statement:
const{
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/thoughts
router
.route('/')
.get(getAllUsers)
.post(addNewUser);


// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
/* {
        "thoughts": [],
        "friends": [],
        "_id": "5f7a70674f70e54934c73e8c",
        "username": "Jonndoe",
        "email": "JonDoe@Smith2.com",
        "__v": 0,
        "friendCount": 0
    }
*/ 
.delete(deleteUser);


// api/thoughts/:thoughtId/reactions
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);


module.exports = router;