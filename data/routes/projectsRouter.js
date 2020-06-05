const express = require('express')
const projects = require('../helpers/projectModel')
const router = express.Router()

//Get endpoint for all the projects 
router.get('/', (req, res) => {
    projects.get()
    .then( project => res.status(200).json(project))
    .catch( err => res.status(500).json({ message :" Projects could not be retrieved", err}) )       
})

//Post endpoint to create a new project 
router.post('/', (req, res) => {
    projects.insert(req.body)
    .then( project => res.status(200).json(project))
    .catch( err => res.status(500).json({ message: "Project could not be added", err}))
})

//Update endpoint to update a current project 
router.put('/:id', (req, res) => {
    projects.update(req.params.id, req.body)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ message: "There was an error while retrieving projects.", err }))
  });

  //Delete endpoint to delete an existing project 
  router.delete('/:id', (req, res) => {
      projects.remove(req.params.id)
      .then(project => res.status(200).json(project))
      .catch(err => res.status(500).json({ message: "There was an error deleting projects", err }))

  })


module.exports = router