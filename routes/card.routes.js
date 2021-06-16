const Card = require("../models/Card");
const Activity = require("../models/Activity");
const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const router = Router();
router.post("/add", auth, async (req, res) => {
  try {
    const name = req.body.name;
    const id = req.body.id;
    const a = await Card.find({});
    let order;
    if (!a.length) {
      order = 1;
    } else {
      let b = a[a.length - 1].order;
      order = b + 1;
    }

    const text = `Пользователь с ID: ${req.user.userId} добавил карточку ${id}`;
    const card = new Card({ name, listId: id, description: "", order });
    await card.save();
    const activity = new Activity({ text, cardId: id });
    await activity.save();
    res.json(card);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.post("/", auth, async (req, res) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.delete("/delete", auth, async (req, res) => {
  try {
    const id = req.body.id;
    const text = `Пользователь с ID: ${req.user.userId} удалил карточку ${id}`;
    const cards = await Card.deleteOne({ _id: id });
    const activity = new Activity({ text, cardId: id });
    await activity.save();
    res.json({ cards });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.patch("/update", auth, async (req, res) => {
  try {
    const description = req.body.description;
    const id = req.body.id;
    const text = `Пользователь с ID: ${req.user.userId} изменил описание карточки ${id}`;
    const activity = new Activity({ text, cardId: id });
    await activity.save();
    const cards = await Card.updateOne(
      { _id: id },
      { description: description }
    );
    console.log(activity);
    res.json(cards);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.post("/drop", auth, async (req, res) => {
  try {
    const cards = req.body;
    for (let i = 0; i < cards.length; i++) {
      const a = await Card.updateOne(
        { _id: cards[i]._id },
        { order: cards[i].order }
      );
      console.log(a);
    }

    res.status(200).json({ message: "Успех" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
router.post("/list", auth, async (req, res) => {
  try {
    const listId = req.body.listId;
    console.log(listId);
    const id = req.body.cardId;
    const card = await Card.updateOne({ _id: id }, { listId: listId });
    res.json(card);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});
module.exports = router;
