const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");

router.route("/").get(category_controller.findAllCategories);

router.route("/add").post(category_controller.addCategory);

router
  .route("/:id")
  .delete(category_controller.findCategoryByIdAndDelete)
  .put(category_controller.findProductsByCategory);

// router.route("/delete").delete(category_controller.deleteAllCategories);
module.exports = router;
