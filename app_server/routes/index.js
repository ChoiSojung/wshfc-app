var express = require('express');
var router = express.Router();
var ctrlProjects = require('../controllers/projects');
var ctrlOthers = require('../controllers/others');

router.get('/', ctrlProjects.projectlist);
router.get('/project', ctrlProjects.projectInfo);
router.get('/project/site/new', ctrlProjects.addSite);

router.get('/about', ctrlOthers.about);

module.exports = router;
