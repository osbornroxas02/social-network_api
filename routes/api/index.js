const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of `/user` & '/thought' to routes created in `user-routes.js` & `thought-routes.js`
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports= router;
