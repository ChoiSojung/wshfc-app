const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },
    siteAddress: {
        type: String
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
    sites:[SiteSchema] 
});

mongoose.model('Project', ProjectSchema);