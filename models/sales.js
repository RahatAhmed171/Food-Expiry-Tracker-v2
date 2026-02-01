const Sequelize=require('sequelize')

const {user}=require('./user')


const sequelize=new Sequelize('Foodexpirytracker','root','',{
     host:'localhost',
     dialect:'mysql',
     port: 3306, 
 });
 const sale=sequelize.define('sale',{
     id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

     },
     customer_name:{
         type: Sequelize.DataTypes.STRING,
         allowNull:true
         
        
     },
     customer_phone:{
         type: Sequelize.DataTypes.STRING,
         allowNull:true
     },
      customer_type:{
         type: Sequelize.DataTypes.STRING,
         allowNull:false
     },
      total_price:{
         type: Sequelize.DataTypes.FLOAT,
         allowNull:false
     },
      advance:{
         type: Sequelize.DataTypes.FLOAT,
         allowNull:true
     },
      remaining:{
         type: Sequelize.DataTypes.FLOAT,
         allowNull:true
     },
      delivery_time:{
         type: Sequelize.DataTypes.DATE,
         allowNull:true
     }
     
    
 },
 {
     freezeTableName: true,
     timestamps: true,
 })
 user.hasMany(sale,{foreignKey:{allowNull:false}})
 


 
 function sync_sale_model(){
     sale.sync({ alter: true }).then(() => { // This DROPS and RECREATES the table
            console.log("sale model recreated successfully");
        });
      };
  
  //Once the model is synced, comment out the sync function call
//sync_sale_model() 
 
 
 
 
 
 
 module.exports={sale}