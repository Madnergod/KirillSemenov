const Comments = require("../models/Comments");
const Activity = require("../models/Activity")

const {Router} = require('express')
const auth = require("../middleware/auth.middleware");
const router = Router()

router.post('/add',auth,async (req,res)=>{
    try {
        const comment = req.body.comments
        const id = req.body.id
        const email = req.body.userEmail
        const text = `Пользователь с ID: ${req.user.userId} добавил комментарий в карточку ${id}`
        const activity = new Activity({text,cardId:id})
        await activity.save()
        const comments = new Comments({text:comment,userEmail:email,cardId:id})
        await comments.save()
        res.json(comments)
    }catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
})
router.get('/get',auth,async (req,res)=>{
    try {
        const comments = await Comments.find({})
        res.json(comments)
    }catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
})

module.exports = router