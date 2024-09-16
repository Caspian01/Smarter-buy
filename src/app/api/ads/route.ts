import { connect } from "@/libs/helpers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";

export async function GET(req: Request, res: Response){
    await connect();
    const url = new URL(req.url)
    const phrase = url.searchParams.get('phrase') || null;
    const filter:FilterQuery<Ad> = {};
    if (phrase){
        filter.title = {$regex: '.*'+phrase+'.*', $options: 'i'}
    }
    

    const adsDocs = await AdModel.find(filter, null, {sort:{createdAt:-1}});
    return Response.json(adsDocs);

}