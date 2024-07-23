const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

//connect to database
mongoose.connect('mongodb+srv://userjuly23:123@cluster0.xe0caai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Summer24', {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Summer24'})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error)
  })

//define Schema class
const Schema = mongoose.Schema;

// Create a Schema object
const s24studentsSchema = new Schema({
  myName : {type: String},
  mySID: {type: Number}
},{collection: 's24students'})

// Create a Model object
const S24Student = mongoose.model("S24Student", s24studentsSchema)
 

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const {myName, mySID} = req.body;
  // connect to the database and log the connection
try{
  
  // add the data to the database
  const newUser = new S24Student({myName:"Huy Thuy Dung Nguyen", mySID: 300363745})
  await newUser.save();
  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
}catch(error){
  res.status(500).json({message: error.message})
}
  
  
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
