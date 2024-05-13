import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest,NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getData } from "@/helpers/getData";
connect();

export async function POST(req:NextRequest){
         const userId=await getData(req)
        const user = await User.findOne({_id:userId}).select('-password -username')

        return NextResponse.json({
            message:"User not found",
            data:user
        })      
}