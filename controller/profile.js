const handleProfile = (req,res,db)=>{
    const { id } = req.params
    db('users').where({ id }).select('*')
    .then(response=>{
        if(response.length){
            res.json(response[0])
        }
        else{
            res.json("No user found")
        }
        })
    .catch(er=>res.status(400).json("error getting user"))
}

module.exports = {
    handleProfile:handleProfile
}