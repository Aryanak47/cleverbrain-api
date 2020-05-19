const handleSignIn = (db,bcrypt) => (req,res)=>{
    const { email , password } = req.body
    db.select('*').from('login').where({email:email})
    .then(user=>{
        const hash = user[0].hash
        const isValidUser = bcrypt.compareSync(password, hash);
        if(isValidUser){
            db.select('*').from('users').where({email:email})
            .then(user=>res.json(user[0]))
            .catch(err=>res.status(400).json("unable to get user"))
        }
    })
    .catch(er=>res.status(400).json("wrong credentials")) 
}

module.exports = {
    handleSignIn:handleSignIn
}