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
    status: {
        type: String,
        enum:['Draft', 'Submitted', null],
        default: 'Draft'
    },
    sites:[SiteSchema] 
});

mongoose.model('Project', ProjectSchema);