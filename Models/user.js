const mongoose = require('mongoose');

main().then( () => {
    console.log("connection successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema=new mongoose.Schema({
  username:String,
  address:[
    {
      _id:false,//automatically id were generating inside the address so avoid this this line is used
      location:String,
      city:String,
    }
  ],

});

//creating model
const User=mongoose.model("User",userSchema);

//saving data to database
const addUsers=async() => {
  let user1=new User({
    username:"sherlockholmes",
    address:[
      {
      location:'221B Baker Street',city:'London'
    },
    {
      location:'p36 DownTown', city:'London',
    }
  ],

  })

  // we can also push the address as follows
  user1.address.push({location:'p32 Down ', city:'London'});


 let result= await user1.save();
 console.log(result);
}

//calling the functon
addUsers();
