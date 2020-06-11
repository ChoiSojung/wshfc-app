const mongoose = require('mongoose');
const Project = mongoose.model('Project');


const doAddSite = (req, res, project)=>{
    if(!project){
        res
            .status(404)
            .json({"message": "Project not found"});
    } else {
        const {siteName, siteAddress} = req.body;
        project.sites.push({
            siteName,
            siteAddress
        });
        project.save((err, project)=>{
            if(err){
                res
                    .status(400)
                    .json(err);
            } else {
                const thisSite = project.sites.slice(-1).pop();
                res
                    .status(201)
                    .json(thisSite);
            }
        });
    }
};


const sitesCreate = (req, res)=>{
    const projectId = req.params.projectid;
    if(projectId){
        Project
            .findById(projectId)
            .select('sites')
            .exec((err, project)=>{
                if(err){
                    res
                        .status(400)
                        .json(err);
                } else {
                    doAddSite(req, res, project);
                }
            });
    } else {
        res
            .status(404)
            .json({"message": "Project not found"});
    }
};

const sitesReadOne = (req, res)=>{
    
};

const sitesUpdateOne = (req, res)=>{
    
};

const sitesDeleteOne = (req, res)=>{
    
};

module.exports = {
    sitesCreate,
    sitesReadOne,
    sitesUpdateOne,
    sitesDeleteOne
};