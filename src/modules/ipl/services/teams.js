import ApiError from "../../../common/config/utils/api-error.js";
import Team from "../models/team.js";
import Owner from "../models/owner.js";



const createTeam = async({name,ownerId})=>{
    
    if(!name || !ownerId) throw ApiError.badRequest("name and ownerId is required")
    const owner = await Owner.findById(ownerId)
    if(!owner) throw ApiError.notfound("owner doesnot exist")
    const team =  await Team.create({name,ownerId})
        
    return team
                
}