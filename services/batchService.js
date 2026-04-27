const {user}=require('../models/user');
const {sale}=require('../models/sales');
const {product}=require('../models/products');
const {batch}=require('../models/batches');
const { Op } = require('sequelize');
const {sequelize}=require('../models/products')

exports.getbatches=async(filters,limit,page,email)=>{
  try{
    const amount=await product.count({
           
    },
    {
        where:{userEmail:filters['userEmail']}
    })
    //if offset greater than amount then do stuff
    // complex params should be handlded
    const offset=(page-1)*limit
    const totalPages = Math.ceil(amount/ limit)

  const batchinfo = await batch.findAll({
    where:{userEmail:filters['userEmail']},
    include: [{
      model: product,
      attributes: ['name'], // Only select 'name' from ModelB
      required: true,
      where:(filters.name)?{
        name: {
          [Op.like]: `${filters.name}%`
        }
      }:{},  // This ensures the INNER JOIN
    }]
  });
return {batchinfo,totalPages,amount}
    
   
}
catch(error){
        throw error
   }

}
exports.createbatch=async({quantity,expiry_date,productid},email)=>{
  const t = await sequelize.transaction();
  try{
    
    const new_batch=await batch.create({quantity:quantity,expiry_date:expiry_date,productId:productid,userEmail:email}, { transaction: t });
    await product.increment('stock_total', 
      { by: quantity, where: { id: productid, userEmail:email }, transaction: t });
  
      
    await t.commit();
    return new_batch;

  }
  catch(error){
    await t.rollback();
    throw error;
  }
}

exports.updatebatch= async(usremail,{expiry_date},batchid)=>{
  try{
   const updatedrows=await batch.update({expiry_date:expiry_date},
      {
         where: { id: batchid, userEmail:usremail }
      })
if (updatedrows > 0) {

const updatedbatch = await batch.findOne({
  where: { id: batchid },
  attributes: ['id','quantity','expiry_date','createdAt','updatedAt'] 
});

return updatedbatch;
}
   if (!updatedbatch) {
                  throw new Error("Could not update batch. Please check your data.")
             };
   return updatedbatch
   
}
catch(error){
        throw error
   }

}



exports.deletebatch= async(usremail,batchid)=>{
  try{
   const quantity=await batch.findOne({
    where: { id: batchid, userEmail:usremail }
   });
   if (!quantity) {
    throw new Error("Could not find the batch. Please check your data.")
   }

  const deletedCount = await batch.destroy({
      where: { id: batchid, userEmail:usremail }
    });
    await product.decrement('stock_total', 
      { by: quantity, where: { id: quantity.productId, userEmail:usremail } });
  
   if (!deletedCount) {
                  throw new Error("Could not delete sale. Please check your data.")
             };
   return deletedCount
   
}
catch(error){
        throw error
        //what if internal server error? what message should be sent?
   }

}

exports.checkfilters=(product_name,email)=>{
    let filters;
    if (product_name!="none"){
        filters={userEmail:email,name:product_name}
        return filters
        
    }
    else{
        filters={userEmail:email}
        return filters
    }

}