const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
const ctrlProjects = require('../controllers/projects');
const ctrlSites = require('../controllers/sites');
const ctrlAuth = require('../controllers/authentication');
const ctrlAssets = require('../controllers/assets');
const ctrlFundings = require('../controllers/fundings');

// projects
router
    .route('/projects')
    .get(ctrlProjects.projectsList)
    .post(ctrlProjects.projectsCreate);

router
    .route('/:userid/projects')
    .get(ctrlProjects.projectsByUserList);

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

// assets
router
	.route('/projects/:projectid/sites/:siteid/assets')
	.post(ctrlAssets.assetsCreate);

router
	.route('/projects/:projectid/sites/:siteid/assets/:assetid')
	.get(ctrlAssets.assetsReadOne)
	.put(ctrlAssets.assetsUpdateOne)
	.delete(ctrlAssets.assetsDeleteOne)

// fundings
router
    .route('/projects/:projectid/fundings')
    .post(ctrlFundings.fundingsCreate);

router
    .route('/projects/:projectid/fundings/:fundingid')
    .get(ctrlFundings.fundingsReadOne)
    .put(ctrlFundings.fundingsUpdateOne);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;