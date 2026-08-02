const express= require("express");

const router= express.Router();

const {createNote,getNotes,updateNotes,deleteNote}= require("../controllers/notesController")
const tokenVerification= require("../middleware/authMiddleware")

router.post("/",tokenVerification,createNote);
router.get("/", tokenVerification, getNotes);
router.put("/:id",tokenVerification,updateNotes)
router.delete("/:id", tokenVerification, deleteNote);

module.exports=router;