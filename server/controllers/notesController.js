const Note = require("../models/Notes");

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Please provide title and description",
      });
    }

    const note = await Note.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    });

    res.status(200).json(notes);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateNotes= async (req,res)=>{
  const {title,description}= req.body;

  try{
  

  const note= await Note.findByIdAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id

    },
    {
    title,
    description
  }
  );

   if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
}

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};

module.exports = {
  createNote,getNotes,updateNotes,deleteNote
};