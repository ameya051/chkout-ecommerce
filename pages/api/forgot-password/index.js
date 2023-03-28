import db from "../../../utils/db";
import User from "../../../models/User";

export async function handler(req, res){
    await db.connect();
    
}