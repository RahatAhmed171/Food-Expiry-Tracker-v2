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
         allowNull:false
         
        
     },
     customer_phone:{
         type: Sequelize.DataTypes.STRING,
         allowNull:false
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
         allowNull:false
     },
      remaining:{
         type: Sequelize.DataTypes.FLOAT,
         allowNull:false
     },
      delivery_time:{
         type: Sequelize.DataTypes.DATE,
         allowNull:false
     }
     
    
 },
 {
     freezeTableName: true,
     timestamps: true,
 })
 user.hasMany(sale,{foreignKey:{allowNull:false}})
 


 
 function sync_sale_model(){
      sale.sync().then(()=>{
          console.log(" sale model syncing succesful")
      }).catch((err)=>{
          console.log(`Error occured :${err}`)
      })
      };
  
  //Once the model is synced, comment out the sync function call
//sync_sale_model() 
 
 
 
 
 
 
 module.exports={sale}