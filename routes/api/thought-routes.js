const router = require('express').Router();

// import statement:
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thought
router
    .route('/')
    // get all
    .get(getAllThought)
    
    // post to create
    .post(createThought)
/* {
        "thoughtText": "I have a thought test",
        "username": "JaneSmith",
        "userId": "5f7a72824f70e54934c73e8e"
    }*/


// Set up GET one, PUT, and DELETE at /api/thought/:id
router
    .route('/:id')
    // get by id
    .get(getThoughtById)
    // put to update
    .put(updateThought)
    // delete to remove
    // /thouight
    .delete(deleteThought)


// api/thought/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    // post to create
    .post(addReaction)

// api/thought/:thoughtId/reactions/:reaction_id
router
    .route('/:thoughtId/reactions/:reactionId')
    // delete to remove
    .delete(deleteReaction)


module.exports = router;