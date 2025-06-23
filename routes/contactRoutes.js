const express=require("express");
const router = express.Router();

const {
    getContacts,
    createContacts,
    getContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactController");
const validToken = require("../middleware/validateTokenHandler");

// router.route("/").get(getContacts);

// router.route("/").post(createContacts);

router.use(validToken);

router.route("/").get(getContacts).post(createContacts);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports=router;