const {user}=require('../models/user');
const {sale}=require('../models/sales');
const {product}=require('../models/products');
const {batch}=require('../models/batches');
const {sequelize}=require('../models/products')
exports.getsales=async(filters,limit,page,email)=>{
      try{
      const amount=await sale.count({
           
        },
        {
            where:{userEmail:email}
        })
        //if offset greater than amount then do stuff
        // complex params should be handlded
        const offset=(page-1)*limit
        const totalPages = Math.ceil(amount/ limit)
    
    
     const sale_info = await sale.findAll({
  attributes: ['id','customer_name','customer_phone','customer_type','total_price','advance','remaining','delivery_time'],
  where: filters,
  offset: offset,
  limit: limit
});
     if (!sale_info) {
                    throw new Error("sale not found")//what does this do?
               };
     return {sale_info,totalPages,amount}
     
}
 catch(error){
          throw error
     }
//if there is no sales acc to the filter, then send 404 not found empty array
}
exports.createsale= async(items,usremail,saledata)=>{
    try{
    
     const allbatches=await deductfrombatches(items,usremail)
     const batchdatainjson = allbatches.map(b => b.toJSON());
     const t = await sequelize.transaction();
     await batch.bulkCreate(batchdatainjson, { 
            updateOnDuplicate: ["quantity"], 
            transaction: t 
        });
    for (const item of items) {
    await product.decrement('stock_total', 
    { by: item.quantity, where: { id: item.productid, userEmail:usremail }, transaction: t });

    }
    const newsale=await sale.create({
    customer_name:saledata.customer_name,
    customer_phone:saledata.customer_phone,
    customer_type:saledata.customer_type,
    total_price: saledata.total_price,
    advance:saledata.advance,
    remaining: saledata.remaining,
    delivery_time:saledata.delivery_time,
    userEmail: usremail
}, { transaction: t });
await t.commit()
    



    
     if (!newsale) {
                    throw new Error("Could not create sales. Please check your data.")
                    //should it send custom error or server error?
               };
     return newsale
     
}
 catch(error){
          throw error
     }

}
exports.updatesale= async(usremail,{customer_name,customer_phone,customer_type,total_price,advance,remaining,delivery_time},saleid)=>{
    try{
     const updatedrows=await sale.update({
           customer_name:customer_name,customer_phone:customer_phone,customer_type:customer_type,total_price:total_price,advance:advance,remaining:remaining,delivery_time:delivery_time
        },
        {
           where: { id: saleid, userEmail:usremail }
        })
if (updatedrows > 0) {
 
  const updated_sale = await sale.findOne({
    where: { id: saleid },
    attributes:['id','customer_name','customer_phone','customer_type','total_price','advance','remaining','delivery_time','createdAt','updatedAt'] 
  });

  return updated_sale;
}
     if (!updated_sale) {
                    throw new Error("Could not update product. Please check your data.")
                    //here first sale is updated and then fetched
                    //so if any one of this fails, what error should be sent?
               };
     return updated_sale
     
}
 catch(error){
          throw error
     }

}
exports.deletesale= async(usremail,saleid)=>{
    try{
    const deletedCount = await sale.destroy({
        where: { id: saleid, userEmail:usremail }
      });
    
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
exports.checkquantity=async(items,usremail)=>{


     
try {
        for (const item of items) {
            // 1. Find product by name (or ID)
            const dbProduct = await product.findOne({ 
                where: { id: item.productid,userEmail:usremail } 
            });

            // 2. Check if product exists
            if (!dbProduct) {
                throw new Error("Could not find the product.")
            }

            // 3. Check availability
            if (dbProduct.stock_total < item.quantity) {
                
                    throw new error(`Insufficient stock for ${item.pname}. Available: ${dbProduct.stock_total}, Requested: ${item.quantity}` )
                
            }
            // also include if any internal server error

            
        }
        

     
        

    } catch (error) {
        throw error
    }

}
exports.calculate_total_price=async(items,usremail)=>{
    let total_price=0
    let ordered_item_price;
    
    try {
        for (const item of items) {
            // 1. Find product by name (or ID)
            const dbProduct = await product.findOne({ 
                where: { id: item.productid,userEmail:usremail } 
            });

            // 2. Check if product exists
            if (!dbProduct) {
                throw new Error("Could not find the product.")
            }
            console.log(dbProduct.unit_price)
            console.log(item.quantity)
           ordered_item_price=dbProduct.unit_price*item.quantity
           console.log(ordered_item_price)
           total_price=total_price+ordered_item_price

            
        }
        console.log(total_price)
        return total_price
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error during stock check." });
        // but what error it will sent if its custom error will it sendabove message?
    }
     
}
async function deductfrombatches(items,usremail){
const itemIds = items.map(i => i.productid);

const allbatches = await batch.findAll({
    where: { productId: itemIds,userEmail:usremail },
    order: [['expiry_date', 'ASC']]
});
for (const requestedItem of items) {
    let toDeduct = requestedItem.quantity;
    console.log(toDeduct)
    

    const relevantBatches = allbatches.filter(b => b.productId == requestedItem.productid)
   
    for (let batch of relevantBatches) {
        if (toDeduct <= 0) break;
        console.log(batch.quantity)
        if (batch.quantity > 0) {
            const take = Math.min(batch.quantity, toDeduct);
            console.log(take)
            batch.quantity -= take; // Update in memory
           
            toDeduct -= take;
        }
    }
   
    //here while batches are fetched from db it may fail, so what error handling 
    //to use??

}
return allbatches


}
exports.checkfilters=(phone,ctype,email)=>{
const bdphoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
let filters;
if (ctype=="quick"){
    filters={userEmail:email,customer_type:ctype}
    return filters
}
else if(ctype=="detailed"){
    if(phone=="none"){
        filters={userEmail:email,customer_type:ctype}
        return filters

    }
  let isvalidphone=bdphoneRegex.test(phone);
  if(isvalidphone){
    filters={userEmail:email,customer_type:ctype,customer_phone:phone}
    return filters
  }
  else{
    throw error("Invalid Phone Number")
  }

}
else if(ctype=="none"){
     filters={userEmail:email}
}
else{
    throw error("Invalid customer type")
}


}
