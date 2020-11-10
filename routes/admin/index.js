const express = require('express');
const router = express.Router();


router.get('/', (req,res) =>{

    res.render('admin/dashboard', {layout:"backendLayout.hbs", title:"Admin||dashboard"})
})

module.exports = router;