const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
//get all

// router.get("/", function (req, res) {
//   try {
//     const conversation = await Conversation.findOne({
//     sender: req.params.sender,conversationId: req.params.conversationId,
//     });
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", function (req, res) {
  Message.find()
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
      senderId: req.params.senderId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.json("The message is DELETED"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
