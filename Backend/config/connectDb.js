const mongoose = require('mongoose')

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.URI)
        console.log(`Database is conencted:
            host ${connect.connection.host}
            name ${connect.connection.name}
        
        `)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
module.exports = connectDb