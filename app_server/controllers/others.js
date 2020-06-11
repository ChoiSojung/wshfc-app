const about = (req, res)=>{
    res.render('generic-text', { 
        title: 'About',
        content: 'WSHFC\'s encourages affordable housing development in the state of Washington. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nunc sed lorem ac nisi dignissim accumsan.'
        
    });
};

module.exports = {
    about
};