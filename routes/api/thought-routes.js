const router = require('express').Router();

// import statement:
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    // get all
    .get(getAllThought)
    // post to create
    .post(createThought)


// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    // get by id
    .get(getThoughtById)
    // put to update
    .put(updateThought)
    // delete to remove
    .delete(deleteThought)


// api/thoughts/:thoughtId/reactions
router
    .route('/:id/reactions')
    // post to create
    .post(createThought)

// api/thoughts/:thoughtId/reactions/:reaction_id
router
    .route('/:id/reactions/:reaction_id')
    // delete to remove
    .delete(deleteThought)


module.exports = router;