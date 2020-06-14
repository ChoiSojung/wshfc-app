const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');

// Get username
const getUser = (req, res, callback)=>{
    if(req.payload && req.payload.email){
        User
            .findOne({email : req.payload.email})
            .exec((err, user)=>{
                if(!user){
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err){
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};

// Helper method to add site
const doAddSite = (req, res, project)=>{
    if(!project){
        res
            .status(404)
            .json({"message": "Project not found"});
    } else {
        const {owner, siteName, siteAddress} = req.body;
        project.sites.push({
            owner,
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

// Exported create site method
const sitesCreate = (req, res)=>{
        const projectId = req.params.projectid;
        if(projectId){
            Project
                .findById(projectId)
                .select('sites')
                .exec((err, project)=>{
                    if(err){
                        return res
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

// Read site
const sitesReadOne = (req, res)=>{
    Project
        .findById(req.params.projectid)
        .select('name sites')
        .exec((err, project)=>{
            if(!project){
                return res
                    .status(404)
                    .json({"message":"project not found"});
            } else if(err){
                return res
                    .status(400)
                    .json(err);
            }
            if(project.sites && project.sites.length>0){
                const site = project.sites.id(req.params.siteid);
                if(!site){
                    return res
                        .status(404)
                        .json({"message":"site not found"});
                } else {
                    const response = {
                        project: {
                            name: project.name,
                            id: req.params.projectid
                        },
                        site
                    };
                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({"message": "No sites found"});
            }
        });
};

// Update site
const sitesUpdateOne = (req, res)=>{
    if(!req.params.projectid || !req.params.siteid){
        return res
            .status(404)
            .json({"message": "Location id and review id were not found"});
    }
    Project
        .findById(req.params.projectid)
        .select('sites')
        .exec((err, project)=>{
            if(!project){
                return res
                    .status(404)
                    .json({"message": "Project not found"});
            } else if (err){
                return res
                    .status(400)
                    .json(err);
            }
            if(project.sites && project.sites.length > 0){
                const thisSite = project.sites.id(req.params.siteid);
                if(!thisSite){
                    res
                        .status(404)
                        .json({"message": "Site not found"});
                } else {
                    thisReview.siteName = req.body.siteName;
                    this.Review.siteAddress = req.body.siteAddress;
                    project.save((err, project)=>{
                        if(err){
                            res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(200)
                                .json(thisSite);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({"message":"No site to update"});
            }
        });
};


// Delete site
const sitesDeleteOne = (req, res)=>{
    const {projectid, siteid}=req.params;
    if(!projectid || !siteid){
        return res
            .status(404)
            .json({"message":"Not found"});
    }
    Project
        .findById(projectid)
        .select('sites')
        .exec((err, project)=>{
            if(!project){
                return res
                    .status(404)
                    .json({"message":"Project not found"});
            } else if(err){
                return res
                    .status(400)
                    .json(err);
            }
            if(project.sites && project.sites.length>0){
                if(!project.sites.id(siteid)){
                    return res
                        .status(404)
                        .json({"message": "Site not found"});
                } else {
                    project.sites.id(siteid).remove();
                    project.save(err=>{
                        if(err){
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({"message":"No site to delete"});
            }
        });
};


module.exports = {
    sitesCreate,
    sitesReadOne,
    sitesUpdateOne,
    sitesDeleteOne
};