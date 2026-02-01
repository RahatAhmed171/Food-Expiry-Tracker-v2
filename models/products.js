const Sequelize=require('sequelize')
const {user}=require('./user')

const sequelize=new Sequelize('Foodexpirytracker','root','',{
     host:'localhost',
     dialect:'mysql',
     port: 3306, 
 });

 const product=sequelize.define('product',{
     id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

     },
     name:{
         type: Sequelize.DataTypes.STRING,
         allowNull:false
         
        
     },
     type:{
         type: Sequelize.DataTypes.STRING,
         allowNull:false
     },

     unit_price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0 // Useful if you already have rows in the table
},
     stock_threshold:{
         type: Sequelize.DataTypes.FLOAT,
         allowNull:false
     },
     stock_total:{
         type: Sequelize.DataTypes.FLOAT,
         allowNull:false
         
     },
    
 },
 {
     freezeTableName: true,
     timestamps: true,
 })
 user.hasMany(product,{foreignKey:{allowNull:false}})

 
function sync_product_model(){
    product.sync({ alter: true }).then(() => { // This DROPS and RECREATES the table
        console.log("Product model recreated successfully");
    });
};
  
  //Once the model is synced, comment out the sync function call
//sync_product_model() 
 
 
 
 
 
 
 module.exports={product,sequelize}