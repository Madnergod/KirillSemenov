const List = require("../models/List");

const {Router} = require('express')
const auth = require("../middleware/auth.middleware");
const router = Router()

router.post('/add',auth,async (req,res)=>{
    try{
        const name = req.body.name;
        const id = req.body.boardId.id
        const list = new List({name,boardId:id})
        await list.save()
        res.json({list})
    }catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
})
router.post('/',auth,async (req,res)=>{
    try {
        const lists = await List.find({boardId:req.body.id})
        res.json(lists)
    }catch (e){
        res.status(500).json({ message: "Что-то пошло не так" });
    }
})
router.delete('/delete',auth,async (req,res)=>{
    try {
        const id = req.body.id
        const lists = await List.deleteOne({_id:id})
        res.json({lists})
    }catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
})
module.exports = router