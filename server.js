import express from 'express';
import bcrypt from 'bcryptjs';
const app = express();
const port = 5000;

app.use(express.json());







app.post('/registration',async (req, res) => {
 const {name, dep, pass} = req.body;
  const salt = await bcrypt.genSaltSync(10);
  var hashpass= await bcrypt.hashSync(pass,salt) ;
  
  var data={
    name,
    dep,
    pass:hashpass
  }


 
  return res.send(data);
})




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

