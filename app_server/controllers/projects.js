const projectlist = (req, res)=>{
    res.render('projects-list', { title: 'Your projects'});
};

const projectInfo = (req, res)=>{
    res.render('project-info', { title: 'Project Info'});
};

const addSite = (req, res)=>{
    res.render('project-site-form', { title: 'Add site'});
};

module.exports = {
    projectlist, 
    projectInfo,
    addSite
};