import express from "express";
import path from "path";
import mongoose  from "mongoose";
import { config } from "dotenv";
import cors from "cors";
config({
    path:"./config.env",
})
mongoose.connect(process.env.MONGO_URI,{
    dbName:"backend"
}).then((c)=>{
    console.log(`Database connected with ${c.connection.host}`);
}).catch((e)=>{
    console.log(e);
})

const vehicleSchema = new mongoose.Schema({
    LicensePlate:String,
    Make:String,
    VIN:String,
    Model:String,
    Type:String,
    Date:Date,
    MilesDriven:Number,
});

const Vehicle = mongoose.model("Vehicles",vehicleSchema);

const server = express();
server.use(express.json());
server.use(express.static(path.join(path.resolve(),"public")));

server.use(express.urlencoded({extended:true}));
server.use(cors({
    origin:["https://nandeshboyz-dashboard.netlify.app"], // remove all unnecessary console.log
    methods:["GET","POST"],
    credentials:true,
}))


server.post("/filter",async(req,res)=>{
    try{
        const { frequency, timeFrame } = req.body;
        //console.log(req.body);

        let message = `Filtered successfully for ${frequency} on ${timeFrame} but no data found.`;
        if(frequency=="daily"){
            const vehicles = await Vehicle.find({ Date: new Date(timeFrame)});
            if(vehicles.length) {
                const sumMilesDriven = vehicles.reduce((total, vehicle) => total + vehicle.MilesDriven, 0);
                return res.json({ success:true,vehicles:vehicles, sumMilesDriven:sumMilesDriven ,daysBetween:1});
            }
            else{
                    return res.json({
                    success:false,
                    message:message
                })
            }
        }
        else{
            const startDate = new Date(timeFrame);
            const endDate = new Date(startDate);
            if(frequency=="weekly"){
                endDate.setDate(endDate.getDate() + 7);
            }
            else if(frequency=="monthly"){
                endDate.setMonth(endDate.getMonth() + 1);
            }
            else if(frequency=="yearly"){
                endDate.setFullYear(endDate.getFullYear() + 1);
            }
            endDate.setDate(endDate.getDate()-1);
            const daysBetween = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))+1;
            // console.log(startDate);
            // console.log(endDate);
            const vehicles = await Vehicle.find({
                Date: { $gte: startDate, $lte: endDate }
            });
            if(vehicles.length){
                const sumMilesDriven = vehicles.reduce((total, vehicle) => total + vehicle.MilesDriven, 0);
                return res.json({ success:true,vehicles:vehicles, sumMilesDriven:sumMilesDriven ,daysBetween:daysBetween});
            }
            else{
                return res.json({
                success:false,
                message:message
                })
            }
        }
    }catch(error){
        //console.error("Error fetching vehicles:", error);
        return res.status(500).send("Internal Server Error");
    }
})

server.listen(process.env.PORT,()=>{
    console.log("server is running");    
})