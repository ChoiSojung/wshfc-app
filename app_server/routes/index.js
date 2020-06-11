var express = require('express');
var router = express.Router();
var ctrlProjects = require('../controllers/projects');
var ctrlOthers = require('../controllers/others');

router.get('/', ctrlProjects.projectslist);
router.get('/project/:projectid', ctrlProjects.projectInfo);

router
    .route('/project/:projectid/site/new')
    .get(ctrlProjects.addSite)
    .post(ctrlProjects.doAddSite);

router.get('/about', ctrlOthers.about);

module.exports = router;
