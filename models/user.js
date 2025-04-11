const Sequelize=require('sequelize')

const sequelize=new Sequelize('Foodexpirytracker','root','',{
     host:'localhost',
     dialect:'mysql',
     port: 3306, 
 });

const user=sequelize.define('user',{
    email:{
        type: Sequelize.DataTypes.STRING,
        primaryKey:true,
       
    },
    fname:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    storename:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
        
    },
   
},
{
    freezeTableName: true,
    timestamps: false,
})

function sync_user_model(){
     user.sync().then(()=>{
         console.log(" user model syncing succesful")
     }).catch((err)=>{
         console.log(`Error occured :${err}`)
     })
     };
 
 //Once the model is synced, comment out the sync function call
 //sync_user_model() 






module.exports={user}