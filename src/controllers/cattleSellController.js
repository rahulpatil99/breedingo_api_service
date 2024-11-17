const cattleSell = require('../models/cattleSell')
const saveCattleSell = require('../models/saveCattleSell')

const getCurrentDateTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

const addCattleForSell = async (request,response) =>{
  const cattleForSell = new cattleSell(request.body);
  await cattleForSell.save();
  response.status(200).json({msg:"cattleSell added successfully"});
}

const getCattleSell = async (request,response) =>{
  const cattleForSell = await cattleSell.find(request.param.id);
  response.status(200).json(cattleForSell);
}

const getAllCattleSell = async (request,response) =>{
  const cattleForSell = await cattleSell.find();
  response.status(200).json(cattleForSell);
}

const getUserCattleForSale = async (request,response) =>{
  const {userId} = request.user;
  const cattleForSell = await cattleSell.find({userId});
  response.status(200).json(cattleForSell);
}

const getAllSaveCattleSell= async (request,response) =>{
  const {userId} = request.user;
  const saveUserCattleSellList = await saveCattleSell.find({userId})
  .populate({
    path:"cattleSellId", // populates all details from the cattleSell document
  } 
  )
    .exec();

    const UserCattleSellList = saveUserCattleSellList.map(item=>item.cattleSellId); //only get cattleSell information
  response.status(200).json(UserCattleSellList);
}

const addSaveCattleSell= async (request,response) =>{
  const {cattleSellId} = request.body;
  const {userId} = request.user;
  const saveUserCattleSell = new saveCattleSell({userId,cattleSellId});
  await saveUserCattleSell.save();
  response.status(200).json({msg:"cattleSell saved successfully"});
}

const deleteSaveCattleSell= async (request,response) =>{
  console.log(request.param.cattleSellId)
  const cattleSellId = request.param.cattleSellId;
  const {userId} = request.user;
  const deletedRecord = await saveCattleSell.findOneAndDelete({userId,cattleSellId});
  if (!deletedRecord) {
    return response.status(404).json({ message: 'Record not found' });
  }
  response.status(200).json({msg:"Record deleted successfully"});
}

module.exports = {addCattleForSell,getCattleSell,getAllCattleSell,getUserCattleForSale,getAllSaveCattleSell,addSaveCattleSell,deleteSaveCattleSell};