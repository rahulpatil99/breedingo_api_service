const cattleSell = require('../models/cattleSell')

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
  //console.log(request.body)
  const cattleForSell = new cattleSell(request.body);
  await cattleForSell.save();
  response.status(200).json({msg:"API test successfully"});
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

module.exports = {addCattleForSell,getCattleSell,getAllCattleSell,getUserCattleForSale};