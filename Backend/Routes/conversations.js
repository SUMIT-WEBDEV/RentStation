const express = require("express");
const router = express.Router();
// const Conversation = require("../Models/conversation");
const Conversation = require("../Models/conversation");

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    // members: []
    // abcd: req.body.abcd,
  });

  try {
    const conversationn = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });

    if (conversationn)
      return res.status(200).json(
        conversationn._id
        // errorMessage: "An account with this email already exists.",
        // console.log("error")
      );

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
    console.log("nice con");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", function (req, res) {
  Conversation.find()
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get("/:id", (req, res) => {
  Conversation.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//get conv of a user

router.get("/userId/:id", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const conversation = await Conversation.findById(req.params.id);
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:conversationId", (req, res) => {
//   Conversation.findById(req.params.id)
//     .then((conversation) => res.json(conversation))
//     .catch((err) => res.status(400).json(`Error: ${err}`))
//     .catch(console.log(err));
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const conversation = await Conversation.findById();
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((con) => res.json(con))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// get conv includes two userId

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

module.exports = router;
