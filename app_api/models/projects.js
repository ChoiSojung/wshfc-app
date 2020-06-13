const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },
    siteAddress: {
        type: String
    },
    owner: {
        type: String
    },
    created:{
        type: Date,
        default: Date.now
    }
});

const ProjectSchema = new mongoose.Schema({
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
    created:{
        type: Date,
        default: Date.now
    },
    sites:[SiteSchema] 
});

mongoose.model('Project', ProjectSchema);