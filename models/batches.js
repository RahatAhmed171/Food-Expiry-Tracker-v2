const Sequelize=require('sequelize')
const {product}=require('./products')
const {user}=require('./user')

const sequelize=new Sequelize('Foodexpirytracker','root','',{
     host:'localhost',
     dialect:'mysql',
     port: 3306, 
 });
 const batch=sequelize.define('batch',{
     id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

     },
     quantity:{
         type: Sequelize.DataTypes.FLOAT,
         allowNull:false
         
        
     },
     expiry_date:{
         type: Sequelize.DataTypes.DATE,
         allowNull:false
     }
     
    
 },
 {
     freezeTableName: true,
     timestamps: true,
 })
 user.hasMany(batch,{foreignKey:{allowNull:false}})
 product.hasMany(batch,{foreignKey:{allowNull:false}})


 
 function sync_batch_model(){
      batch.sync().then(()=>{
          console.log(" batch model syncing succesful")
      }).catch((err)=>{
          console.log(`Error occured :${err}`)
      })
      };
  
  //Once the model is synced, comment out the sync function call
//sync_batch_model() 
 
 
 
 
 
 
 module.exports={batch}