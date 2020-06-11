const projectlist = (req, res)=>{
    res.render('projects-list', { 
        title: 'Your projects',
        pageHeader: {
            title: 'WSHFC-Application Portal',
            strapline: 'Register to start your application'
        },
        sidebar: 'Questions or Comments? Contact us at mhcf@wshfc.org',
        projects: [{
            name: 'Copper Landing',
            address: '208 15th Ave'
        },{
            name: 'Reserve at Lynnwood',
            address: '1000 104th Street'
        }, {
            name: 'The Confluence',
            address: '5618 54th Street'
        }]
    });
};

const projectInfo = (req, res)=>{
    res.render('project-info', { 
        title: 'Copper Landing',
        pageHeader: {title: 'Copper Landing'},
        sidebar: {
            context: 'Context'
        },
        project: {
            name: 'Copper Landing',
            address: '208 15th Ave',
            sites: [{
                siteName: 'Copper',
                siteAddress: '208 15th Ave, Seattle WA'
            },{
                siteName: 'Landing',
                siteAddress: '1093 23rd Ave, Seattle, WA'
            }]
        }
    });
};

const addSite = (req, res)=>{
    res.render('project-site-form', { 
        title: 'Add site',
        pageHeader: {
            title: 'Add site to Copper Landing'
        }
    });
};

module.exports = {
    projectlist, 
    projectInfo,
    addSite
};