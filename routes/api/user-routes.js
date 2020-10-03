const router = require('express').Router();

// import statement:
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    // get all
    .get(getAllUser)
    // post to create
    .post(getUserById)


// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    // get by id
    .get(getUserById)
    // put to update
    .put(updateUser)
    // delete to remove
    .delete(deleteUser)


// api/thoughts/:thoughtId/reactions
router
    .route('/:id/reactions')
    // post to create
    .post(createUser)

// api/thoughts/:thoughtId/reactions/:reaction_id
router
    .route('/:id/reactions/:reaction_id')
    // delete to remove
    .delete(deleteUser)


module.exports = router;