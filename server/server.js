const express=require('express')
const app=express()
const mongoose=require('mongoose')

const PORT=5000
const{MONGOURI}=require('./keys')

mongoose.connect(MONGOURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected"))
.catch(err => console.log("DB connection failed", err))

mongoose.connection.on('error', (err)=>{
    console.log(err)
})

require('./model/user')
require('./model/post')
//mongoose.model()
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})