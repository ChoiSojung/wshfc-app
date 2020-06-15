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
const doAddFunding = (req, res, project)=>{
    if(!project){
        res
            .status(404)
            .json({"message": "Project not found"});
    } else {
        const {
			owner,
			projectRef,
			sponsor,
			cosponsor,
			consultant,
			program,
			contactIsConsultant,
			ownership,
			ownershipType,
			ownershipState,
			lender,
			investor,
			previousCommissionFinancing,
			dda,
			qct,
			federalSetAside,
			allocationType,
			firstCreditYear,
			estimatedCredit,
			taxCreditFactor,
			anticipatedClosing,
			totalProjectCost,
			totalDevelopmentCost,
			totalDevelopmentCostLimit,
			tdcWaiver,
			studios,
			oneBdrms,
			twoBdrms,
			threeBdrms,
			fourBdrms,
			fiveBdrms,
			disabled,
			elderly,
			homeless,
			largehh,
			farmworker,  
			taxExemptBond,
			taxableBond	
		} = req.body;
        project.fundings.push({
            owner,
			projectRef,
			sponsor,
			cosponsor,
			consultant,
			program,
			contactIsConsultant,
			ownership,
			ownershipType,
			ownershipState,
			lender,
			investor,
			previousCommissionFinancing,
			dda,
			qct,
			federalSetAside,
			allocationType,
			firstCreditYear,
			estimatedCredit,
			taxCreditFactor,
			anticipatedClosing,
			totalProjectCost,
			totalDevelopmentCost,
			totalDevelopmentCostLimit,
			tdcWaiver,
			studios,
			oneBdrms,
			twoBdrms,
			threeBdrms,
			fourBdrms,
			fiveBdrms,
			disabled,
			elderly,
			homeless,
			largehh,
			farmworker,  
			taxExemptBond,
			taxableBond
        });
        project.save((err, project)=>{
            if(err){
                res
                    .status(400)
                    .json(err);
            } else {
                const thisFunding = project.fundings.slice(-1).pop();
                res
                    .status(201)
                    .json(thisFunding);
            }
        });
    }
};

// Create site
const fundingsCreate = (req, res)=>{
        const projectId = req.params.projectid;
        if(projectId){
            Project
                .findById(projectId)
                .select('fundings')
                .exec((err, project)=>{
                    if(err){
                        return res
                            .status(400)
                            .json(err);
                    } else {
                        doAddFunding(req, res, project);
                    }
                });
        } else {
            res
                .status(404)
                .json({"message": "Project not found"});
        }
};

// Read site
const fundingsReadOne = (req, res)=>{
    Project
        .findById(req.params.projectid)
        .select('fundings')
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
            if(project.fundings && project.fundings.length>0){
                const funding = project.fundings.id(req.params.fundingid);
                if(!funding){
                    return res
                        .status(404)
                        .json({"message":"funding not found"});
                } else {
                    return res
                        .status(200)
                        .json(site);
                }
            } else {
                return res
                    .status(404)
                    .json({"message": "No fundings found"});
            }
        });
};

// Update site
const fundingsUpdateOne = (req, res)=>{
    if(!req.params.projectid || !req.params.fundingid){
        return res
            .status(404)
            .json({"message": "Project and site ids were not found"});
    }
    Project
        .findById(req.params.projectid)
        .select('fundings')
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
            if(project.fundings && project.fundings.length > 0){
                const thisFunding = project.fundings.id(req.params.fundingid);
                if(!thisFunding){
                    res
                        .status(404)
                        .json({"message": "Funding not found"});
                } else {
					thisFunding.sponsor = req.body.sponsor;
					thisFunding.cosponsor = req.body.cosponsor;
					thisFunding.consultant = req.body.consultant;
					thisFunding.program = req.body.program;
					thisFunding.contactIsConsultant = req.body.contactIsConsultant;
					thisFunding.ownership = req.body.ownership;
					thisFunding.ownershipType = req.body.ownershipType;
					thisFunding.ownershipState = req.body.ownershipState;
					thisFunding.lender = req.body.lender;
					thisFunding.investor = req.body.investor;
					thisFunding.previousCommissionFinancing= req.body.previousCommissionFinancing;
					thisFunding.dda= req.body.dda;
					thisFunding.qct= req.body.qct;
					thisFunding.federalSetAside= req.body.federalSetAside;
					thisFunding.allocationType= req.body.allocationType;
					thisFunding.firstCreditYear= req.body.firstCreditYear;
					thisFunding.estimatedCredit= req.body.estimatedCredit;
					thisFunding.taxCreditFactor= req.body.taxCreditFactor;
					thisFunding.anticipatedClosing= req.body.anticipatedClosing;
					thisFunding.totalProjectCost= req.body.totalProjectCost;
					thisFunding.totalDevelopmentCost= req.body.totalDevelopmentCost;
					thisFunding.totalDevelopmentCostLimit= req.body.totalDevelopmentCostLimit;
					thisFunding.tdcWaiver= req.body.tdcWaiver;
					thisFunding.studio= req.body.studios;
					thisFunding.oneBdrm= req.body.oneBdrms;
					thisFunding.twoBdrm= req.body.twoBdrms;
					thisFunding.threeBdrm= req.body.threeBdrms;
					thisFunding.fourBdrm= req.body.fourBdrms;
					thisFunding.fiveBdrm= req.body.fiveBdrms;
					thisFunding.disabled= req.body.disabled;
					thisFunding.elderly= req.body.elderly;
					thisFunding.homeless= req.body.homeless;
					thisFunding.largehh= req.body.largehh;
					thisFunding.farmworker= req.body.farmworker;  
					thisFunding.taxExemptBond= req.body.taxExemptBond;
					thisFunding.taxableBond= req.body.taxableBond;
                    project.save((err, project)=>{
                        if(err){
                            res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(200)
                                .json(thisFunding);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({"message":"No funding to update"});
            }
        });
};




module.exports = {
    fundingsCreate,
    fundingsReadOne,
    fundingsUpdateOne
};