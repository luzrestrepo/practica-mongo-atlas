const express = require('express');

const app = express();

const port = 3000;

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://canoluz2023:rMTDvi6eSC2lyUTH@cluster0.bs5s07z.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(url)

app.get('/',async (req,res)=>{
    try {
       /*  await client.db("admin").command({ ping: 1 });
        console.log("conexion exitosa"); */
        const db = client.db('ada_test1')
        const collection = db.collection('users')
        const documentos = await collection.find().toArray();

        client.close();
        res.send(documentos)   

    } catch (error) {
        console.log('ocurrio un error en tu servidor', error)
        
    }
})

app.post('/',async (req,res)=>{
   const newUser ={
    name:"pepito",
    age:"25"
   } 
try {
    await client.connect();
    const db = client.db('ada_test1')
    const collection = db.collection('users')
    const document = await collection.insertOne(newUser)

    client.close();
    res.send(document)



} catch (error) {
    console.log('Error', error)
}

})




app.listen(port,()=>{
    console.log('servidor corriendo' + port)
})








/* mongodb+srv://canoluz2023:<password>@cluster0.bs5s07z.mongodb.net/?retryWrites=true&w=majority */