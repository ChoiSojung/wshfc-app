const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})
const ctrlProjects = require('../controllers/projects');
const ctrlSites = require('../controllers/sites');
const ctrlAuth = require('../controllers/authentication');

// projects
router
    .route('/projects')
    .get(ctrlProjects.projectsList)
    .post(auth, ctrlProjects.projectsCreate);

router
    .route('/projects/:projectid')
    .get(ctrlProjects.projectsReadOne)
    .put(auth, ctrlProjects.projectsUpdateOne)
    .delete(auth, ctrlProjects.projectsDeleteOne);

// sites
router
    .route('/projects/:projectid/sites')
    .post(auth, ctrlSites.sitesCreate);

router
    .route('/projects/:projectid/sites/:siteid')
    .get(auth, ctrlSites.sitesReadOne)
    .put(auth, ctrlSites.sitesUpdateOne)
    .delete(auth, ctrlSites.sitesDeleteOne);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;