const mongoose = require('mongoose');
const { Schema } = mongoose;
main().then( () => {
    console.log("connection successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema=new Schema({
    username:String,
    email:String
});

const postSchema=new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }


})


const User=mongoose.model("User",userSchema);
const Post=mongoose.model("Post",postSchema);

const addData = async () =>{
    // let user1=new User({
    //     username:"rahulkumar",
    //     email:"rahul@gmail.com"
    // });

    // let post1=new Post({
    //     content:"Hellow world",
    //     likes:7
    // });

    let user= await User.findOne({username:"rahulkumar"});

    let post2=new Post({
        content:"Bye Bye!",
        likes:7
    });

    // post1.user=user1;
    post2.user=user;

    // await user1.save();
    await post2.save();



}

// addData();

// const del= async() =>{
//    await User.findByIdAndDelete("6608c7ad62018be8831dd982");
//    await User.findByIdAndDelete("660c26d1e4e5a97a81cd73fb");

// }

// del();

const getData= async () =>{
    // let result=await Post.findOne({}).populate("user");
    let result=await Post.findOne({}).populate("user","username");// if we want to pring only the username
    console.log(result);



}

getData();
