let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
let Post = require("./database/schema.js");
//for method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//for post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//static file serve
app.use(express.static(path.join(__dirname, "public")));
app.listen(port,()=>{
    console.log("Bhai Sunuchi Be");
});
//show all lists
app.get("/posts",async(req,res)=>{
    let posts = await Post.find();
    res.render("show.ejs",{posts});
});
//crete a new post
//render a form
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
//add to the new post to database
app.post("/posts",async(req,res)=>{
    let{username,content,likes} = req.body;
    let newPost = new Post({
        username : username,
        content : content,
        likes : likes,
    });
    await newPost.save();
    res.redirect("/posts");
});
//for viewing the post 
app.get("/posts/:id",async(req,res)=>{
    let {id} = req.params;
    let post = await Post.findById(id);
    res.render("home.ejs",{post});
});
//edit the post
//render a form
app.get("/posts/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let post = await Post.findById(id);
    res.render("edit.ejs",{post});
});
//update the form
app.patch("/posts/:id",async(req,res)=>{
    let {id} = req.params;
    let {content} = req.body;
    await Post.findByIdAndUpdate(
        id,
        {content : content},
        {
            new : true,
            runValidators :true,
        },
    );
    res.redirect(`/posts/${id}`);
    
});
//delete route
app.delete("/posts/:id",async(req,res)=>{
    let {id} = req.params;
    let delpost = await Post.findByIdAndDelete(id);
    res.redirect("/posts");
    console.log(delpost);
});
