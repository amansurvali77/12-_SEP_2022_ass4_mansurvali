import express, { request, response } from 'express';
import mongoose from 'mongoose';
import customers1 from './Models.js';

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/customers1?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4"

const app = express();

app.use(express.json());

app.use("/createuser", async (request, response) => {

    var data = await customers1.insertMany({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        age: request.body.age,
        address: request.body.address,
        authkey:request.body.authkey
    })
    response.status(200).json(data);
})

app.use("/update", async (request, response) => {
    var data = await customers1.findOneAndUpdate(
        { $and: [{ age: 45 }, { address: "Covai" }] },
        {
            $set:
            {
                address: request.body.address,
                age: request.body.age
            }
        })
        if(data){
            response.status(200).json(data);
        }
        else{
            response.status(200).json({ message: "Data Not Found", status: 0 }) 
        }
});
app.use("/deleteuser", async (request, response) => {

    var data = await customers1.remove({
        name:request.body.name
    })
        response.status(200).json("data delete sucessfully"); 
})

mongoose.connect(CONNECTION_STRING)
    .then(() => {
        app.listen(3030, () => console.log("successed on running"));
    })
    .catch((error) => {
        console.log(error)
    })
