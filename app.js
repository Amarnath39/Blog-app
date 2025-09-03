const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require('bcrypt')
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const userModel = require("./models/users")

let app = Express()
app.use(Express.json())
app.use(Cors())

mongoose.connect("mongodb+srv://newuser:newuser123@cluster0.tltdtp9.mongodb.net/blogappDB?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signup", async (req, res) => {

    let input = req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword
    // console.log(data)
    // res.send(data)

    let check = userModel.find({ email: req.body.email }).then(
        (items) => {

            if (items.length > 0) {
                res.json({ "status": "email id already registered!" })
            }
            else {
                let result = new userModel(input)
                result.save()
                res.json({ "status": "success" })
            }


        }
    )


    // if(check.length>0){
    //     res.json({"status":"email id already registered!"})
    // }

    // else{
    //     let result=new userModel(input)
    //     await result.save()
    //     res.json({"status":"success"})
    // }

})



app.listen(3000., () => {
    console.log("server running at 3000")
})