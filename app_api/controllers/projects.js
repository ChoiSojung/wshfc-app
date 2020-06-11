const mongoose = require('mongoose');
const Project = mongoose.model('Project');

// Create site
const projectsCreate = (req, res)=>{
    Project.create({
        name: req.body.name,
        address: req.body.address
    },
    (err, project)=>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(project);
        }
    });
};

// Read site
const projectsReadOne = (req, res)=>{
    Project
        .findById(req.params.projectid)
        .exec((err, project)=>{
            if(!project){
                return res
                    .status(404)
                    .json({"message": "project not found"});
            } else if(err){
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(project);
            }
        });
};

// Update site
const projectsUpdateOne = (req, res)=>{
    if(!req.params.projectid){
        return res
            .status(404)
            .json({
                "message": "Not found, projectid is required"
            });
    }
    Project
        .findById(req.params.projectid)
        .select('-sites')
        .exec((err, project)=>{
            if(!project){
                return res
                    .status(404)
                    .json({
                        "message": "projectid not found"
                    });
            } else if (err){
                return res
                    .status(400)
                    .json(err); 
            }
            project.name = req.body.name;
            project.address = req.body.address;
            project.save((err, project)=>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(project);
                }
            });
        });    
};

// Delete site
const projectsDeleteOne = (req, res)=>{
    const {projectid} = req.params;
    if(projectid){
        Project
            .findByIdAndRemove(projectid)
            .exec((err, project)=>{
                if(err){
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No project"
            });
    }
};

module.exports = {
    projectsCreate,
    projectsReadOne,
    projectsUpdateOne,
    projectsDeleteOne
};