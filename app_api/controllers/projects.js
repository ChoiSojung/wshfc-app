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


// List projects
const projectsList = (req, res)=>{
    let projects = [];
        Project
            .find()
            .exec((err, theseprojects)=>{
                if(!theseprojects){
                    console.log('Projects not found');
                    return res
                        .status(404)
                        .json({"message": "Projects not found"});
                } else if(err){
                    console.log('Projects list error: ' + err);
                    return res
                        .status(404)
                        .json(err);
                } else {
                    projects = theseprojects
                    return res
                        .status(200)
                        .json(projects);
                }
            });
};

// Create project
const projectsCreate = (req, res)=>{
            Project.create({
                owner: req.body.owner,
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

// Read project
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

// Update project
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

// Delete project
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
    projectsList,
    projectsCreate,
    projectsReadOne,
    projectsUpdateOne,
    projectsDeleteOne
};