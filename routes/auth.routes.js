const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const config = require('config')
const {check,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const router = Router()
const auth = require("../middleware/auth.middleware");

router.post(
        '/register',
    [
        check('email','Неккоректный e-mail').isEmail(),
        check('password','Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (req,res)=>{
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Некоректные данные при авторизации'
            })
        }

        const {email,password} =  req.body
        const candidate = await User.findOne({email})
        if(candidate){
           return res.status(400).json({message:'Такой пользователь уже существует'})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email,password:hashedPassword})
        await user.save()
        res.status(201).json({message:'Пользователь создан'})
    }catch (e) {
        res.status(500).json({message:'Что-то пошло не так'})
    }


})
router.post('/getById',auth,async (req,res)=>{
    try {
        const id = req.user.userId
        const user = await User.findOne({_id:id})
        res.json(user)
    }catch (e) {
        res.status(500).json({message:'Что-то пошло не так'})
    }
})
router.post(
    '/login',
    [
        check('email','Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req,res)=>{

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            const {email,password} = req.body

            const user = await User.findOne({email})

            if (!user){
                return res.status(400).json({message:'Что-то пошло не так,попробуйте снова'})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                return res.status(400).json({message:'Неверный пароль,попробуйте снова'})
            }
            const token = jwt.sign(
                {userId:user._id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token,userId:user._id})
        }catch (e) {
            res.status(500).json({message: 'Что-то пошло не так,попробуйте снова'})
        }

    })
module.exports = router