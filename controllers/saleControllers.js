const saleService = require('../services/saleService');
exports.calculateprice= async (req, res) =>{
    try{
   
      
        const {items}=req.body
        
        saleService.checkquantity(items,req.user.email)
        const total_price=await saleService.calculate_total_price(items,req.user.email)
        console.log(total_price)
        res.status(200).json({total_price:total_price})
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
              // again it could be custom or server error
         }
}
exports.createsale= async (req, res) =>{
    try{
   
      
        const {customer_type,total_price,items,customer_name,customer_phone,advance,remaining,delivery_time}=req.body
        const newsale=await saleService.createsale(items,req.user.email,{customer_type,total_price,customer_name,customer_phone,advance,remaining,delivery_time})
        res.status(201).json({newsale,message: "sale created successfully"})
  
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
              // again it could be custom or server error?
         }
}
exports.getsales= async (req, res) =>{
    try{
        console.log('hi')
        const limit=req.query.limit=parseInt(req.query.limit)||10;
        const page=req.query.page=parseInt(req.query.page)||1;
        const customer_phone=req.query.customer_phone||'none';
        const customer_type=req.query.customer_type||'none';
        const filters=saleService.checkfilters(customer_phone,customer_type,req.user.email)
        const {sale_info,totalPages,amount}=await saleService.getsales(filters,limit,page,req.user.email)
         res.status(200).json({sale_info,
            "total":amount,"page":page,"totalpages":totalPages})
         }
         catch(error){
              res.status(400).json({ message: error.message });
             // i cant send 400 for all errors
         }
}

exports.updatesale= async (req, res) =>{
    try{
        const saleid= req.params.id;
      const delivery_time = req.body.delivery_time || null;
      const customer_name=req.body.customer_name || null;
       const remaining = req.body.remaining || null;
      const customer_phone=req.body.customer_phone || null;
    const advance = req.body.advance || null;
      const total_price=req.body.total_price
      const customer_type=req.body.customer_type
      const updated_sale=await saleService.updatesale(req.user.email,{customer_name,customer_phone,customer_type,total_price,advance,remaining,delivery_time},saleid)
         return res.status(200).json({ updated_sale,message: "Sale updated successfully" });
        
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
              //again it could be custom or server error?
         }
}
exports.deletesale= async (req, res) =>{
    try{
     
        const saleid = req.params.id;
        const deleted_count=await saleService.deletesale(req.user.email,saleid)
        
        if (deleted_count === 0) {
        return res.status(404).json({ message: "sale not found" });
      }

        return res.status(200).json({ message: "sale deleted successfully" });
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
              // what if internal server error?
         }
}