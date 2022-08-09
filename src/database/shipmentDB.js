const { readJson, writeFile } = require("../utils/fileHandling");
const { selectOneOrder } = require('../database/OrderDB');



  exports.create = async (obj, orderId) => {
    try{
    let ship =  await readJson(process.env.SHIP_JSON);
    let orderExists = await selectOneOrder(orderId).length <= 0 ? false : await selectOneOrder(orderId);
    if (orderExists && orderExists.status == "paid") {    
    ship.push(obj)
     
     await writeFile(process.env.SHIP_JSON, ship);
        // return true;
    } else {
      throw "Either orderId is not found or status is not paid";
    }
  }catch(error){
    console.log(error)
  }
  }

exports.updateShipAddress = async (shipmentId,{address = null}) => {
  try {
    let shipping = await readJson(process.env.SHIP_JSON);
    const newShipAddress = shipping.map((ship) => {
      if (ship.shipmentId == shipmentId) {
        ship.address = address === null ? ship.address : address;
      }
      return ship;
    });
    writeFile(process.env.SHIP_JSON, newShipAddress);
  } catch (error) {
    throw error
  }
    
} 



