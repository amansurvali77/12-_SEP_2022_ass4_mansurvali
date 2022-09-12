import express from 'express';
import mongoose from 'mongoose';

const schemaName = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    address:String,
    authkey:Number
});

export default mongoose.model("customers1",schemaName);