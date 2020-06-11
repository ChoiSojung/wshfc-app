const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    siteName: {
        type: String
    },
    siteAddress: {
        type: String
    }
});

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    sites:[SiteSchema] 
});

mongoose.model('Project', ProjectSchema);