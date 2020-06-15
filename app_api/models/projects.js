const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
	owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
	siteRef: {
		type: mongoose.Schema.ObjectId,
		ref: 'Site'
	},
    created:{
        type: Date,
        default: Date.now
    },
	"assetAddress": String,
	"lih": Number,
	"cau": Number,
	"mu": Number
});

const SiteSchema = new mongoose.Schema({
	owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
	projectRef: {
		type: mongoose.Schema.ObjectId,
		ref: 'Project'
	},
    created:{
        type: Date,
        default: Date.now
    },
    siteName: {
        type: String,
        required: true
    },
    siteAddress: {
        type: String
    },
	legalDesc: {
		type: String
	},
	taxId: {
		type: String
	},
	assets:[AssetSchema]
});

const FundingSchema = new mongoose.Schema({
	owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created:{
        type: Date,
        default: Date.now
    },
	"sponsor": String,
	"cosponsor": String,
	"consultant": String,
	"program": String,
	"contactIsConsultant": Boolean,
	"ownership": String,
	"ownershipType": String,
	"ownershipState": String,
	"lender": String,
	"investor": String,
	"previousCommissionFinancing": Boolean,
	"dda": String,
	"qct": String,
	"federalSetAside": String,
	"allocationType": String,
	"firstCreditYear": String,
	"estimatedCredit": Number,
	"taxCreditFactor": Number,
	"anticipatedClosing": String,
	"totalProjectCost": Number,
	"totalDevelopmentCost": Number,
	"totalDevelopmentCostLimit": Number,
	"tdcWaiver": Boolean,
	"studio": Number,
	"oneBdrm": Number,
	"twoBdrm": Number,
	"threeBdrm": Number,
	"fourBdrm": Number,
	"fiveBdrm": Number,
	"disabled":Number,
	"elderly":Number,
	"homeless":Number,
	"largehh":Number,
	"farmworker":Number,
	"taxExemptBond": Number,
	"taxableBond": Number
});

const ProjectSchema = new mongoose.Schema({
	owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created:{
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    status: {
        type: String,
        enum:['Draft', 'Submitted', null],
        default: 'Draft'
    },
    sites:[SiteSchema],
	fundings: [FundingSchema]
});

mongoose.model('Project', ProjectSchema);