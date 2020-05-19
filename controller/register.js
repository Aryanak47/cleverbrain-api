
handleRegister = (db,bcrypt) => (req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password ){
        return res.status(400).json("incorrect form submission")
    }
    const hash = bcrypt.hashSync(password,10)
    db.transaction(trx=>{
        trx.insert({
            email:email,
            hash:hash
        })
        .into("login")
        .returning("email")

        .then( loginEmail => {
         return trx('users')
            .returning('*')
            .insert({
                name: name,
                email:loginEmail[0],
                joined:new Date()
            })
            .then(data=>{
                res.json(data[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json("Unable to register due to some problem"))
}

module.exports = {
    handleRegister:handleRegister
}