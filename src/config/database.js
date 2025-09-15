const mongoose  = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://kavitabisht200106:c3yft4sHrZ_TNBc@cluster0.quupgfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log("MongoDB connection error:", err);
        // process.exit(1);
    });
} 
module.exports = connectDB