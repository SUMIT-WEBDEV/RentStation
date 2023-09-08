const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/products");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../public/photos");
    // console.log(req.url)
    // console.log("hey")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// const multipleUpload = upload.fields([{ name: "file1" }, { name: "file2" }]);

//REQUEST GET ALL ARTICLES
router.get("/", function (req, res) {
  Products.find()
    .then((Product) => res.json(Product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// REQUEST ADD NEW ARTICLE
router.post("/add", upload.array("Image", 6), (req, res) => {
  const hello = [];

  var i = 0;

  for (i; i < req.files.length; i++) {
    hello.push(req.files[i].originalname);
    // console.log(req.files[i].originalname);
  }

  // console.log(hello);

  const newProduct = new Products({
    price: req.body.price,
    location: req.body.location,
    description: req.body.description,
    title: req.body.title,
    userId: req.body.userId,
    username: req.body.username,
    category: req.body.category,
    // for (let i=0; i<3; i++) {
    //   Image: req.files[i].originalname,
    // }
    duration: req.body.duration,
    Image: hello,
  });
  // formData.append("Image", e.target.files[i]);

  newProduct
    .save()
    .then(() => console.log("The new Product added!"))
    // .then(() => res.json("The new Room added!"))
    .catch((err) => res.status(400).json(`Error : ${err}`));
});

// REQUEST FIND ARTICLE BY ID
router.get("/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((Product) => res.json(Product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// REQUEST FIND ARTICLE BY ID AND UPDATE
router.put("/update/:id", upload.single("Image", 3), (req, res) => {
  Products.findById(req.params.id).then((Product) => {
    Product.price = req.body.price;
    Product.price = req.body.location;
    Product.description = req.body.description;
    Product.maxCapacity = req.body.macCapacity;
    Product.Image = req.file.originalname;

    Product.save()
      .then(() => res.json("The room is updated successfully"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });
});

// REQUEST FIND ARTICLE BY ID AND DELETE
router.delete("/:id", (req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(() => res.json("The room is DELETED"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// router.get("/:userId", async (req, res) => {
//   try {
//     const messages = await Message.findById({
//       userId: req.params.conversationId,
//       senderId: req.params.senderId,
//     });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:userId", (req, res) => {
//   Products.findBy({
//     userId: req.params.userId,
//   })
//     .then((product) => res.json(product))
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

router.get("/user/:userId", async (req, res) => {
  try {
    const messages = await Products.find({
      userId: req.params.userId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// router.post("/add", upload.single("roomImage"), (req, res) => {
//   const { location1, location2 } = req.body;
//   const loc_field = { location1, location2 };

//   const newProduct = new Products({
//     description: req.body.description,
//     maxCapacity: req.body.maxCapacity,
//     roomImage: req.file.originalname,
//   });

//   newProduct.price = loc_field;
//   newProduct
//     .save()
//     .then(() => res.json("The new Room added!"))
//     .catch((err) => res.status(400).json(`Error : ${err}`));
// });
