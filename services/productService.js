const {user}=require('../models/user');
const {product}=require('../models/products');
exports.getproducts= async(filters,limit,page)=>{
    try{
      const amount=await product.count({
           
        },
        {
            where:{userEmail:filters['email']}
        })
        //if offset greater than amount then do stuff
        // complex params should be handlded
        const offset=(page-1)*limit
        const totalPages = Math.ceil(amount/ limit)
    
    
     const product_info = await product.findAll({
  attributes: ['id','name', 'type','stock_threshold','stock_total'],
  where: filters,
  offset: offset,
  limit: limit
});
     if (!product_info) {
                    throw new Error("Product not found")
               };
     return {product_info,totalPages,amount}
     
}
 catch(error){
          throw error
     }

}

exports.createproducts= async(usremail,{pname,ptype,threshold,total})=>{
    try{
     const newproduct=await product.create({name:pname,type:ptype,stock_threshold:threshold,stock_total:total,userEmail:usremail})
    
     if (!newproduct) {
                    throw new Error("Could not create product. Please check your data.")
               };
     return newproduct
     
}
 catch(error){
          throw error
     }

}
exports.updateproduct= async(usremail,{pname,ptype,threshold,total},productid)=>{
    try{
     const updatedrows=await product.update({
           name:pname,type:ptype,stock_threshold:threshold,stock_total:total
        },
        {
           where: { id: productid, userEmail:usremail }
        })
if (updatedrows > 0) {
 
  const updatedProduct = await product.findOne({
    where: { id: productid },
    attributes: ['id','name', 'type','stock_threshold','stock_total','createdAt','updatedAt'] 
  });

  return updatedProduct;
}
     if (!updateproduct) {
                    throw new Error("Could not update product. Please check your data.")
               };
     return updateproduct
     
}
 catch(error){
          throw error
     }

}
exports.deleteproduct= async(usremail,productid)=>{
    try{
    const deletedCount = await product.destroy({
        where: { id: productid, userEmail:usremail }
      });
    
     if (!deletedCount) {
                    throw new Error("Could not delete product. Please check your data.")
               };
     return deletedCount
     
}
 catch(error){
          throw error
     }

}





exports.checkfilters=(p_name,p_type)=>{
     if ((pname=='none')&& (p_type!='none')){
          filters={type:p_type}
     }
     else if((pname=!'none')&& (p_type=='none'))
     {
          filters={name:p_name}
     }
     else{
          filters={name:p_name,type:p_type}

     }
     return filters
}
