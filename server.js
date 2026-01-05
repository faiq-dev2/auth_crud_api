import express from 'express';
import bcrypt from 'bcryptjs';
//db connectivity
import connect from "./config/db.js";
import userdataSchema from "./Model/UserModel.js";



const app = express();
const port = 5000;

app.use(express.json());



//register api
app.post('/registration',async (req, res) => {
 const {name, email, pass} = req.body;
  const salt = await bcrypt.genSaltSync(10);
  var hashpass= await bcrypt.hashSync(pass,salt) ;
  
  if(!name || !email || !pass){
    return res.send("All field need to be filled");
  }

  var data={
    name,
    email,
    pass:hashpass
  }
  
  await userdataSchema.create(data);

  return res.send(data);
});

//login api
app.post('/login',async (req,res)=>{
  try{
   const {email,pass}= req.body;

  if(!email || !pass){
    return res.status(400).send('Kinldy Fill all fields');
  }

  var userdata =  await userdataSchema.findOne({email});
  if(!userdata){
    return res.send("User not found");
  }
//password matching
  var  ismatch =  await bcrypt.compare(pass,userdata.pass);
  if(!ismatch){
    return res.send("Invalid password");
  }
  return res.send({
    message :"login successfully",
    user : userdata
  });
  }
  catch(err){
    return res.status(500).send("Server error" + err.message);
  }
});


  



app.listen(port, () => {
  connect();
  console.log(`Server is running on http://localhost:${port}`);
})

