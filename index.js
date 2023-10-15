const express=require("express");
const app=express();
const path=require("path");
const{v4:uuidu4}=require("uuid");
const methodOverride=require('method-override');
app.use(methodOverride('_method'));

let port =8080;

app.listen(port,()=>{
    console.log("server start..")
})
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[{
    id:uuidu4(),
    username:"rohanmaan0",
    content:"Everything you can imagine is real..",

},
{
    id:uuidu4(),
    username:"username231",
    content:"It always seems impossible until its done.. ",
},
{
    id:uuidu4(),
    username:"professor",
    content:"The plan is designed to survive..",
},
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id =uuidu4();
    posts.push({username,content,id});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post})
})
app.patch("/posts/:id",(req,res)=>{                        
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post})
})
app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
    
    res.redirect("/posts");
})
