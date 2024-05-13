import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest,NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect();

export async function GET(req:NextRequest){
    try {
        const response = NextResponse.json({
            message:"Logout successfully!",
            sucess:true,
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0),
        })

        return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}