const productService = require('../services/productService');
exports.getproducts = async (req, res) =>{
    try{
        const limit=req.query.limit=parseInt(req.query.limit)||10;
        const page=req.query.page=parseInt(req.query.page)||1;
        const name=req.query.name||'none';
        const type=req.query.type||'none';
        let filters;
        if((name=="none")&&(type=='none')){
            filters={userEmail:req.user.email}
            
        }
        else{
            filters=productService.checkfilters(name,type)
        }
        const {product_info,totalPages,amount}=await productService.getproducts(filters,limit,page)
        
        res.status(200).json({product_info,
            "total":amount,"page":page,"totalpages":totalPages})
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
         }
}
exports.createproducts= async (req, res) =>{
    try{
     
        const {pname,ptype,threshold,total}=req.body
        const new_product=await productService.createproducts(req.user.email,{pname,ptype,threshold,total})
        
        res.status(201).json({new_product,message: "Product created successfully"})
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
         }
}
exports.deleteproduct= async (req, res) =>{
    try{
     
        const productId = req.params.id;
        const deleted_count=await productService.deleteproduct(req.user.email,productId)
        
        if (deleted_count === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

        return res.status(200).json({ message: "Product deleted successfully" });
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
         }
}
exports.updateproduct= async (req, res) =>{
    try{
       const productId = req.params.id;
       const {pname,ptype,threshold,total}=req.body
       const updated_product=await productService.updateproduct(req.user.email,{pname,ptype,threshold,total},productId)
       return res.status(200).json({ updated_product,message: "Product updated successfully" });
        
         }
         catch(error){
              res.status(400).json({ message: error.message });
         }
}