const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://vaishnavamit905:8kQYhvxKuEruzj5b@cluster0.6ic2tqy.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
      
    
    // Check the connection state
    const readyState = mongoose.connection.readyState;
    
    if (readyState===1) {
      console.log('Mongoose connection is open');
      const db = mongoose.connection.db;
      //Access the "food_items" collection and fetch data
      //const collection = db.collection("food_items");
      //const data = await collection.find({}).toArray();
      // const coll=db.collection("food_category");
      // const catData=await coll.find({}).toArray();
      // global.food_items=data;
      // global.foodCategory=catData;
      console.log("Data fetched successfully:");
      return db;
      //console.log(global.foodCategory, "\n\n\n\n\n\n\n\n\n\n\n", global.food_items);
    } else {
      console.log('Mongoose connection is not open');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = mongoDB;