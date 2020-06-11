const request = require('request');
const apiOptions = {
    server:'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production'){
    apiOptions.server = 'https://pure-cliffs-65474.herokuapp.com/';
}

const showError = (req, res, status)=>{
    let title='';
    let content='';
    if(status === 404){
        title = '404, page not found';
        content = 'Page not found';
    } else {
        title=`${status}, general error`;
        content = 'Something is wrong';
    }
    res.status(status);
    res.render('generic-text', {
        title, 
        content
    });
};

const getProjectInfo = (req, res, callback)=>{
    const path = `/api/projects/${req.params.projectid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json:{}
    };
    request(
        requestOptions,
        (err, {statusCode}, body)=>{
            let data = body;
            if (statusCode === 200){
                callback(req, res, data);
            } else {
                showError(req, res, statusCode);
            }
        }
    );  
};

// Render projects list
const renderProjectslist = (req, res, responseBody)=>{
    let message = null;
    if(!(responseBody instanceof Array)){
        message="API lookup error";
        responseBody=[];
    } else {
        if(!responseBody.length){
            message="You have no projects yet, why don't you create one?";
        }
    }
    res.render('projects-list', {
        title:'Your projects',
        pageHeader: {
            title: 'WSHFC-Application Portal',
            strapline: 'Register to start your application'
        },
        sidebar: 'Questions or Comments? Contact us at mhcf@wshfc.org',
        projects: responseBody,
        message
    });
};


// Get projects list
const projectslist = (req, res)=>{
    const path = '/api/projects';
    const requestOptions = {
        url:`${apiOptions.server}${path}`,
        method: 'GET',
        json:{}
    };
    request(
        requestOptions,
        (err, {statusCode}, body)=>{
            let data=[];
            if(statusCode === 200 && body.length){
                data = body.map((item)=>{
                    return item;
                });
            }
            renderProjectslist(req, res, data);
        }
    );
};


// Render project info
const renderProjectInfo = (req, res, project)=>{
    res.render('project-info', {
        title: project.name,
        pageHeader: {
            title: project.name
        },
        sidebar: {
            context: 'Context'
        },
        project
    });
};


// Get project info
const projectInfo = (req, res)=>{
    getProjectInfo(req, res,
        (req, res, responseData)=> renderProjectInfo(req, res, responseData)
    );
};

// Helper to render add site form
const renderSiteForm = function (req, res, {name}){
    res.render('project-site-form',{
        title: `Add site for ${name}`,
        pageHeader: {
            title: `Add site for ${name}`
        },
        error: req.query.err
    });
};


// Render site form
const addSite = (req, res)=>{
    getProjectInfo(req, res,
        (req, res, responseData)=>renderSiteForm(req, res, responseData)
    );
};

//Add site
const doAddSite = (req, res)=>{
    const projectid = req.params.projectid;
    const path = `/api/projects/${projectid}/sites`;
    const postdata = {
        siteName: req.body.siteName,
        siteAddress: req.body.siteAddress
    };
    const requestOptions = {
        url:`${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, {statusCode}, {name})=>{
            if(statusCode === 201){
                res.redirect(`/project/${projectid}`);
            } else {
                showError(req, res, statusCode);
            }
        }
    );
};

module.exports = {
    projectslist, 
    projectInfo,
    doAddSite,
    addSite
};