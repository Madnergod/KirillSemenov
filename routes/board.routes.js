const { Router } = require("express");
const Board = require("../models/Board");
const { check } = require("express-validator");

const auth = require("../middleware/auth.middleware");
const {validationResult} = require("express-validator");
const router = Router();

router.get("/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json(board);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const boards = await Board.find({});
    res.json(boards);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.post(
  "/create",
    [
      check('name','Минимальная длина пароля 6 символов').isLength({min:1})
    ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return res.status(400).json({
          errors:errors.array(),
          message:'Вы ничего не ввели'
        })
      }
      const id = {
        id: req.user.userId,
      };
      const name = req.body;
      const board = new Board({ name: name.name, userId: id.id });
      await board.save();
      res.json({ board });
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так" });
    }
  }
);

module.exports = router;
