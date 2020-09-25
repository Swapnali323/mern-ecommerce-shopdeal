const Users = require('../models/userModel')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const { response } = require('express')

const client = new OAuth2Client('35746752649-8gulr2l93p5lmn3imql443bs9c3ehe86.apps.googleusercontent.com')

const userCtrl = {
    register: async(req, res) =>{
        try {
            const {name, email, password,role} = req.body;

            const user = await Users.findOne({email: email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password:passwordHash,role
            })

             await newUser.save()

             // Create refresh - access token
             const accesstoken = createAccessToken({id: newUser._id})
             const refreshtoken = createRefreshToken({id: newUser._id})
             
             res.cookie('refreshtoken', refreshtoken, {
                 httpOnly: true,
                 path: '/user/refresh_token'
             })

            res.json({accesstoken})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async(req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email: email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // Create refresh - access token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})
            
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async(req, res) =>{
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
      
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            console.log()

            if(!rf_token) return res.status(400).json({msg: "Please Login Now"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register Now!"})
                const accesstoken = createAccessToken({id: user.id})
                res.json({accesstoken})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async(req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})
            
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
      
    },
    addCart: async(req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id},{
                cart: req.body.cart
            })
            
            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Payments.find({user_id: req.user.id})
            
            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    googleOAuth:(req, res, next) => {
        // // Generate token
        // const accesstoken = signToken(req.user);
        // res.cookie('refreshtoken', accesstoken, {
        //   httpOnly: true
        // });
        // res.status(200).json({ success: true });
        const {idToken} = req.body;
        client.verifyIdToken({idToken, audience:"35746752649-8gulr2l93p5lmn3imql443bs9c3ehe86.apps.googleusercontent.com"})
        .then(response=>{
            const {email_verified,name,email}=response.payload;
            console.log(response.payload)
            if(email_verified){
               Users.findOne({email}).exec((err,user)=>{
                    if(err){
                        return res.status(400).json({
                            error:"Something went wrong..."
                        })
                    }
                    else{
                        if(user){
                            const accesstoken = createAccessToken({id: user._id})
                            const refreshtoken = createRefreshToken({id: user._id})
                            
                            res.cookie('refreshtoken', refreshtoken, {
                                httpOnly: true,
                                path: '/user/refresh_token'
                            })
                            res.json({accesstoken})
                        }else{
                            let password=email;
                            let newUser=new Users({name, email, password});
                            newUser.save((err,data)=>{
                                if(err){
                                    return res.status(400).json({
                                        error:"Something went wrong..."
                                    })
                                }
                                const accesstoken = createAccessToken({id: user._id})
                                const refreshtoken = createRefreshToken({id: user._id})
                                
                                res.cookie('refreshtoken', refreshtoken, {
                                    httpOnly: true,
                                    path: '/user/refresh_token'
                                })
                                res.json({accesstoken})
                            })

                        }
                    }
                })
            }
        })
        console.log()
      },
    createadmin:async(req,res)=>{
         try {
            const user = new User({
            name: 'Vaidehee',
            email: 'admin@example.com',
            password: '123456',
            role: 1,
            });
            const newUser = await user.save();
            res.send(newUser);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
}


const createAccessToken = user =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const signToken = user => {
    return jwt.sign({
      iss: 'Swapnali',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, process.env.ACCESS_TOKEN_SECRET);
  }

const createRefreshToken = user =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports = userCtrl