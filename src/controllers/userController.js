require('dotenv').config();
const User = require('../models/user');
const UserCoin = require('../models/userCoin');
const UserTransactions = require('../models/userTransactions');

const findMaxCount = async () => {
  console.log(await User.find().select('userId').sort({userId:-1}).limit(1));
}

const ViewPrice = process.env.ViewPrice;

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

const registerUser = async (request,response) =>{
  console.log(request.body);
  const user = new User(request.body);
  user.lastLogIn = getCurrentDateTime();
  const savedUser = await user.save();
  const userCoinObject = {
    userId :savedUser.userId,
    totalCoin:200,

  }
  new UserCoin(userCoinObject).save();
  response.status(200).json({msg:"API test successfully"});
}
const updateCreditCoin = 0;


const updateDebitCoin = async (request,response) =>{
  const buyerId = request.body.buyerId;
  const sellerId = request.body.sellerId;

  // const buyerObjectId = mongoose.Types.ObjectId(buyerId);
  //   const sellerObjectId = mongoose.Types.ObjectId(sellerId);

  const buyerData = await User.find({ userId:buyerId})
  if(!buyerData){
    return response.status(404).json({ msg: "User not found" });
  }
  else{
    const buyerCoinData = await UserCoin.findOne({ userId:buyerId});
    if(buyerCoinData.totalCoin-ViewPrice <0)
      return response.status(404).json({ msg: "insufficient balance" });
    else{
      try {
        
        buyerCoinData.totalCoin -= ViewPrice;
        await buyerCoinData.save();

        const sellerData = await User.findOne({ userId:sellerId})
        const transaction = {
          userId:buyerId,
          transactionDescription:`Viewed seller ${sellerId}'s contact.`,
          transactionAmount : ViewPrice,
          transactionType : 'debited'
        }
        new UserTransactions(transaction).save();
        response.status(200).json({ msg: "User coin updated successfully",'userMobile':sellerData.mobileNumber});
      } catch (error) {
        response.status(500).json({ error: error.message }); 
      }
    }
  }
}

module.exports = {registerUser,updateDebitCoin};