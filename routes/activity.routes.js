const Activity = require("../models/Activity")

const {Router} = require('express')
const auth = require("../middleware/auth.middleware");
const router = Router()

router.post('/',auth,async (req,res)=>{
    const activity = await Activity.find({})
    res.json(activity)
})
module.exports = router