const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const router = express.Router()

// @desc get note
//@route GET /api/note/getNote
// @access public 
router.get('/getNote', fetchuser, async(req, res) => {
    console.log('................', req.params);
    try {
      //  console.log('................', req);
        const notes = await Notes.find({user: req.user.id})
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({error: "Invalid api request"})
    }
})

// @desc add note
//@route POST /api/note/addNote
// @access public 
router.post('/addNote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 5}),
    body('description', 'Exact description neede').isLength({min: 10})
    ],
     async(req, res) => {
    try {
        console.log('////////////', req.body);
        const {title, description, tag} = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
          res.status(404).json({error: error.array()});
        }
        const note = await Notes.create({
            title,
            description,
            tag,
            user: req.user.id
        })
        res.status(200).json({note})
    } catch (error) {
        res.status(500).json({error: "Invalid api request"})
    }
})

// @desc update note
//@route PUT /api/note/update/:id
// @access public 
router.put('/update/:id', fetchuser, async(req, res) => {
  const {title, description, tag} = req.body;
  const newNote = {};
  if(title){newNote.title = title};
  if(title){newNote.description = description};
  if(title){newNote.tag = tag};
  try{
    let note = await Notes.findById(req.params.id);
    if(!note) {
       return res.status(404).send("Not found!")
    }
    if(note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note})
  } catch(error) {
    res.status(500).json({error: "invalid request", message: error.message})
  }
})

//@desc delete note
//@router DELETE /api/note/delete/:id
//@access private
router.delete('/delete/:id', fetchuser, async(req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
    if(!note) {
      res.status(404).send("Note is not found")
    }
    if(note.user.toString() !== req.user.id){
       return res.status(404).send("User don't have permission to update contact")
    }
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({success: "delete successful"})
    } catch (error) {
        res.status(500).json({error: "invalid request", message: error.message})
    }
})

module.exports = router