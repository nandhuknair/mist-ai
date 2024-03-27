const express = require('express')
const router = express.Router()
require('dotenv').config()
const User = require('../model/userModel')
const Chat = require('../model/chatModel')

const auth =(req,res,next)=> {
    if (!req.session.userId) {
        next()
    }else{
        res.redirect('/')
    }
}

const userAuth = (req,res,next)=> {
    if(req.session.userId){
        next()
    }else{
        res.redirect('/login')
    }
}


router.get('/',userAuth,async(req,res)=> {
    try {
        if(!req.session.userId){
           return res.redirect('/login')
        }
        const chat = await Chat.find({user:req.session.userId})
        const user = await User.findById(req.session.userId)

        console.log(chat)                            
        
        console.log(req.session.userId)
        return res.render('index',{chats:chat,user})
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal server error')
    }
})

router.get('/login',auth,async (req,res)=> {
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal server error')
    }
})

router.get('/signup',auth,async(req,res)=> {
    try {
        res.render('signup')
    } catch (error) {
        console.log(error)
        return res.status(500).status('Internal server error')
    }
})

router.get('/signup',auth,async(req,res)=> {
    try {
        res.render('signup')
    } catch (error) {
        console.log(error)
        return res.status(500).status('Internal server error')
    }
})

router.get('/forget_password',auth,async(req,res)=> {
    try {
        res.render('reset-password')
    } catch (error) {
        console.log(error)
        return res.status(500).status('Internal server error')
    }
})

router.get('/logout',async(req,res)=> {
    try {
        req.session.userId = null
        res.redirect('/login')
    } catch (error) {
        console.log(error)
        return res.status(500).status('Internal server error')
    }
})


const axios = require('axios');




router.post('/sendPrompt',userAuth,async (req,res)=> {
    const {data} = req.body
    try {
        const options = {
            method: 'POST',
            url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': process.env.OPENAIKEY,
              'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
            },
            data: {
              messages: [
                {
                  role: 'user',
                  content: data
                }
              ],
              web_access: false,
              system_prompt: '',
              temperature: 0.9,
              top_k: 5,
              top_p: 0.9,
              max_tokens: 100
            }
          };

    const response = await axios.request(options);

    const userId = req.session.userId
            const newChat = new Chat({
                user:userId,
                messages:[
                    {
                        prompt:data,
                        message:response.data.result
                    }
                ]
            })
            await newChat.save()

	console.log(response.data.result);
    res.status(200).json({data:response.data.result})

    } catch (error) {
      console.log(error)
    }
  })


//   router.post('/sendPrompt',userAuth,async (req,res)=> {
//     const {data} = req.body
//     try {
//         console.log('Entered to teh sendprompt page')
//         console.log('this is the data ' + data)
//         const message = "Global warming is the gradual increase in the Earth's average surface temperature due to an increased concentration of greenhouse gases such as carbon dioxide and methane in the atmosphere. These greenhouse gases trap heat from the sun that would otherwise escape into space, resulting in a warmer planet. The effects of global warming include rising sea levels, more frequent extreme weather events such as droughts and hurricanes, and changes in ecosystems and wildlife behavior."
//         const userId = req.session.userId
//         const newChat = new Chat({
//             user:userId,
//             messages:[
//                 {
//                     prompt:data,
//                     message:message
//                 }
//             ]
//         })
//         await newChat.save()
//         console.log(`${newChat}This is the new chat baybyyyy----------------------------`)
//         return res.status(200).json({data:message})

//     } catch (error) {
//       console.log(error)
//     }
//   })


  router.post('/signupAction',auth,async (req,res)=> {
    try {
        console.log('entered into the signupaction')
        const { userName , email , mobile , password } = req.body
        const userExist = await User.find({email:email})
        if(!userExist){
          return res.status(400).json({message:"This email is already taken please Login"})
        }
        const newUser = new User({
            userName:userName,
            email:email,
            mobile:mobile,
            password:password
        })        

        await newUser.save()
        return res.status(200).json({message:"Now you are our part"})

    } catch (error) {
        console.log(error)
    }
  })


  router.post('/loginAction',auth,async (req,res)=> {
    try {
        console.log('entered to login action')
        const { email , password } = req.body
        const user = await User.findOne({email:email})

        if(!user) return res.status(400).json({message:"You are not a user please Signup"})

        if(user.password !== password) return res.status(400).json({message:"Incorrect password"})

        req.session.userId = user._id

        res.status(200).json({message:"Successfully logged in"})
    } catch (error) {
        console.log(error)
    }
  })


module.exports = router