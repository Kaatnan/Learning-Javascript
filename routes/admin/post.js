const express = require('express');
const router = express.Router();
const Post = require('../../model/Post')

router.get('/add', (req, res) =>{
    res.render('admin/post/add-post', {layout: 'backendLayout'})
});


router.post('/add', (req, res) =>{
    const {post_name, post_desc} = req.body;
        let errors = [];
    if(!post_name || !post_desc){
        errors.push({msg: "please fill in all the fields"})
    }
    if(errors.length > 0){
        res.render('admin/post/add-post', {layout: 'backendLayout', errors})
    }
            const newPost = new Post({
                postName: post_name,
                postDesc: post_desc
            })
            newPost.save()
            .then(post =>{
                req.flash('success_msg', post.postName  +  ' was created successfully')
                res.redirect('/post/add')
            })
});



router.get('/all', (req, res) =>{
    Post.find()
    .then(post =>{
        if(post){
            res.render('admin/post/all-posts', {layout: 'backendLayout', post})
        }
    })
    .catch(err =>{
        req.flash('success_msg', 'there was an error. Try again!')

    })

});


router.get('/edit/:id', (req, res) =>{

    Post.findOne({_id: req.params.id})
    .then(post =>{
        if(post){
            res.render('admin/post/edit-post', {layout: 'backendLayout', post})
        }
    })

    .catch(err =>{
        req.flash("error_msg", "There was an error")
    })

    
});


router.get('/update', (req, res) =>{
    res.render('admin/post/edit-post', {layout: 'backendLayout'})
});


router.post('/update/:id', (req, res) =>{
    const {post_name, post_desc} = req.body;
        let errors = [];
    if(!post_name || !post_desc){
        errors.push({msg: "please fill in all the fields"})
    }
    if(errors.length > 0){
        res.render('admin/post/edit-post', {layout: 'backendLayout', errors})
    }
    else{
        //checking if category exists
        const updatePost = {
            postName: post_name,
            postDesc: post_desc
        }

        Post.findOneAndUpdate({_id: req.params.id}, {$set: updatePost}, {new: true})
        .then(post =>{
            req.flash('success_msg', post.postName + ' was successfully updated')
            res.redirect('/post/all')
        })
        .catch(err =>{
            req.flash('error_msg', "There was an error, Try Again")
        })
        // newCategory.save()
        // .then(category =>{
        //     req.flash('success_msg', category.categoryName  +  'was created successfully')
        //     res.redirect('/category/add')
        // })
    }
});

router.get('/delete/:id', (req, res) =>{
    Post.findOneAndDelete({_id: req.params.id})
    .then(post =>{
        req.flash('error_msg', post.postName + ' was successfully deleted')
        res.redirect('/post/all')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })
})


module.exports = router;