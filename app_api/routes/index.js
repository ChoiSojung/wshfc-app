const express = require('express');
const router = express.Router();
const ctrlProjects = require('../controllers/projects');
const ctrlSites = require('../controllers/sites');

// projects
router
    .route('/projects')
    .post(ctrlProjects.projectsCreate);

router
    .route('/projects/:projectid')
    .get(ctrlProjects.projectsReadOne)
    .put(ctrlProjects.projectsUpdateOne)
    .delete(ctrlProjects.projectsDeleteOne);

// sites
router
    .route('/projects/:projectid/sites')
    .post(ctrlSites.sitesCreate);

router
    .route('/projects/:projectid/sites/:siteid')
    .get(ctrlSites.sitesReadOne)
    .put(ctrlSites.sitesUpdateOne)
    .delete(ctrlSites.sitesDeleteOne);


module.exports = router;