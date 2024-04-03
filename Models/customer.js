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

const orderSchema=new mongoose.Schema({
    item: String,
    price:Number,


});

const customerSchema=new mongoose.Schema({
    name:String,
    orders:[{
        type: Schema.Types.ObjectId, //storing object id goto populate secion of mongoosejs.com
        ref:"Order",//kun collection ko id soter garne ttyasko ref rakhne
    }]
})
const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);

// const addCustomer = async () =>{
//     let cust1=new Customer({
//         name:"Rahul Kumar",

//     });

//     let order1= await Order.findOne({item:"Chips"});
//     let order2=await Order.findOne({item:"Chocolate"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result=await cust1.save();
//     console.log(result);

// }

// addCustomer();


const findCustomer= async () =>{
    let result= await Customer.find({}).populate("orders");//orders is the name of field written in schema
    console.log(result[0]);

}

findCustomer();
// const addOrders= async () =>{
//    let res= await Order.insertMany([
//         {item:"Samosa",price:12},
//         { item: "Chips", price:10},
//         {item:"Chocolate",price:40}
//     ]);
//     console.log(res);
// };

// addOrders();

