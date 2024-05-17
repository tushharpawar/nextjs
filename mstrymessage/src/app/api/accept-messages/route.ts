import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(req:Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message: "Not authenticated"
        },{status:401})
    }

    const userId = user._id
    const {acceptMessages} = await req.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage:acceptMessages},
            {new:true},
        )

        if(!updatedUser){
            return Response.json({
                success:false,
                message: "Failed to update satus for accepting message"
            },{status:401})
        }

        return Response.json({
            success:true,
            message: "Status updated successfully",
            updatedUser
        },{status:201})

    } catch (error) {
        console.log("failed to update satus for accepting message",error)
        return Response.json({
            success:false,
            message: "failed to update satus for accepting message"
        },{status:500})
    }

    
}

export async function GET(req:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message: "Not authenticated"
        },{status:401})
    }

    const userId = user._id
    try {
        const foundUser = await UserModel.findById(userId)
    
        if(!foundUser){
            return Response.json({
                success:false,
                message: "User not found"
            },{status:404})
        }
    
        return Response.json({
            success:true,
            isAcceptingMessage : foundUser.isAcceptingMessage
        },{status:200})
    } catch (error) {
        console.log("Error while getting message acceptance status")

        return Response.json({
            success:false,
            message: "Error while getting message acceptance status"
        },{status:404})
    }
}