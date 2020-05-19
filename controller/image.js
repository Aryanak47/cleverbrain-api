
const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '57a8ba726d614e1385d349c514734011'
   });
   

const handleImageUrl = (req,res) =>{
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
   .then( data=>res.json(data))
}

const handleImage = (req,res,db)=> {
    const { id } = req.body
    db('users').where({id:id})
    .increment("entries",1)
    .returning("entries")
    .then(entries=>  res.json(entries))
    .catch(err=>res.status(400).json("unable to get entries"))
}

module.exports = {
   handleImage,
   handleImageUrl
}