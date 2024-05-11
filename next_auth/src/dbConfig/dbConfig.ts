import mongoose from "mongoose";

export async function connect() {
    try {
        
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('MongoDB connected')
        })

        connection.off('error',(err)=>{
            console.log("MongoDb Connection Error occured!");
            console.log(err);
            process.exit();            
        })

    } catch (error) {
        console.log("Something went wrong while connecting database!");
        console.log(error);
        
    }
}