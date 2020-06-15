const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Site = mongoose.model('Project');
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

// Helper add asset method
const doAddAsset = (req, res, project, site)=>{
	if(!project||!site){
		res
			.status(404)
			.json({"message": "Project site not found"});
	} else {
		const {owner, siteRef, assetAddress, lih, cau, mu} = req.body;
		site.assets.push({
			owner,
			siteRef,
			assetAddress,
			lih,
			cau,
			mu
		});
		project.save((err, project)=>{
			if(err){
				res
					.status(400)
					.json(err);
			} else {
				const thisAsset = site.assets.slice(-1).pop();
				res
					.status(201)
					.json(thisAsset);
			}
		});
	}
};

// Exported create asset method
const assetsCreate = (req, res)=>{
	Project
		.findById(req.params.projectid)
		.select('sites')
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
					//now add asset
					doAddAsset(req, res, project, site);
                }
			}  
		});
};

// Read asset
const assetsReadOne = (req, res)=>{
	Project
		.findById(req.params.projectid)
		.select('sites')
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
					if(site.assets && site.assets.length>0){
						const asset = site.assets.id(req.params.assetid);
						if(!asset){
							return res
								.status(404)
								.json({"message": "asset not found"});
						} else {
							return res
								.status(200)
								.json(asset);
						}		
					} else {
						return res
							.status(404)
							.json({"message": "No assets found"});
					}
				} 
			} else {
				return res
					.status(404)
					.json({"message": "No sites found"})
			}
		});
};

// Update asset
const assetsUpdateOne = (req, res)=>{
	Project
		.findById(req.params.projectid)
		.select('sites')
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
					if(site.assets && site.assets.length>0){
						const thisAsset = site.assets.id(req.params.assetid);
						if(!thisAsset){
							return res
								.status(404)
								.json({"message": "Asset not found"});
						} else {
							thisAsset.assetAddress = req.body.assetAddress;
							thisAsset.lih = req.body.lih;
							thisAsset.cau = req.body.cau;
							thisAsset.mu = req.body.mu;
							project.save((err, project)=>{
								if(err){
									res
										.status(404)
										.json(err);
								} else {
									res
										.status(200)
										.json(thisAsset);
								}
							});
						}		
					} else {
						return res
							.status(404)
							.json({"message": "No assets found"});
					}
				} 
			} else {
				return res
					.status(404)
					.json({"message": "No sites found"})
			}
		});
	
};

// Delete asset
const assetsDeleteOne = (req, res)=>{
	const {projectid, siteid, assetid}=req.params;
    if(!projectid || !siteid || !assetid){
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
					if(site.assets && site.assets.length>0){
						if(!site.assets.id(assetid)){
							return res
								.status(404)
								.json({"message": "Asset not found"});
						} else {
							site.assets.id(assetid).remove();
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
						return res
							.status(404)
							.json({"message": "No asset to delete"});
					}
				} 
			} else {
				return res
					.status(404)
					.json({"message": "No sites found"})
			}
		});
};

module.exports = {
    assetsCreate,
    assetsReadOne,
    assetsUpdateOne,
    assetsDeleteOne
};