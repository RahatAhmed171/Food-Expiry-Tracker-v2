const batchService = require('../services/batchService');

exports.getbatches= async (req, res) =>{
    try{
        
        const limit=req.query.limit=parseInt(req.query.limit)||10;
        const page=req.query.page=parseInt(req.query.page)||1;
        const product_name=req.query.product_name||'none';
        const filters=batchService.checkfilters(product_name,req.user.email)
        const {batchinfo,totalPages,amount}=await batchService.getbatches(filters,limit,page,req.user.email)
        
         res.status(200).json({batchinfo,
            "total":amount,"page":page,"totalpages":totalPages})
         

         }
         catch(error){
            res.status(400).json({ message: error.message });

         }
}
exports.createbatch= async (req, res) =>{
   try{
       
      const {quantity,expiry_date,productid}=req.body
      const new_batch=await batchService.createbatch({quantity,expiry_date,productid},req.user.email)
      res.status(201).json({new_batch,message: "Batch created successfully"})
        
         
        

        }
        catch(error){
           res.status(400).json({ message: error.message });

        }
}

exports.updatebatch= async (req, res) =>{
   try{
      const batchid = req.params.id;
      const {expiry_date}=req.body
      const updated_batch=await batchService.updatebatch(req.user.email,{expiry_date},batchid)
      return res.status(200).json({ updated_batch,message: "batch updated successfully" });
       
        }
        catch(error){
             res.status(400).json({ message: error.message });
        }
}
exports.deletebatch= async (req, res) =>{
   try{
    
       const batchid = req.params.id;
       const deleted_count=await batchService.deletebatch(req.user.email,batchid)
       
       if (deleted_count === 0) {
       return res.status(404).json({ message: "batch not found" });
     }

       return res.status(200).json({ message: "batch deleted successfully" });
       
        }
        catch(error){
             res.status(400).json({ message: error.message });
             // what if internal server error?
        }
}