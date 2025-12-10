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

app.post("/signin",async(req,res)=>{

    let input =req.body
    let result =userModel.find({email:req.body.email}).then(
        (item)=>{
            if (item.length>0) {
                    const passwordValidator=Bcrypt.compareSync(req.body.password,item[0].password)
                    if (passwordValidator) {
                        jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                            (error,token)=>{
                                if (error) {
                                    res.json({"status":"error","errorMessage":error})
                                    
                                } else {

                                    res.json({"status":"success","token":token,"userid":item[0]._id})
                                    
                                }
                            }
                        )
                    } else {
                        res.json({"status":"incorrect password"})
                    }
                
            } else {
                res.json("invalid email!!")
            }
        }
    )
})


// SIGNUP
app.post("/signup", async (req, res) => {

    let input = req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword
    console.log(data)
    res.send(data)

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