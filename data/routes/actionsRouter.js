const express = require('express')
const actions = require('../helpers/actionModel')
const projects = require('../helpers/projectModel')
const router = express.Router()

//Get endpoint for all actions 
router.get('/', (req, res) => {
    actions.get()
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({
        message: "Actions could not be retrieved",
        err
    }))
})

//Get endpoint for a single action by Id 
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

//Post endpoint to create a new action 
router.post('/', validateProjectId, (req, res) => {
const body = req.body;
actions
    .insert(body)
    .then(newAction => {
        res.status(200).json(newAction);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           message: 'Error posting new action'
        });
    });

});

// //Middleware
function validateProjectId(req, res, next) {
    if (req.body.project_id) {
        projects
            .get(req.body.project_id)
            .then(project => {
                if (project) {
                    project = req.project;
                    next();
                } else {
                    res.status(404).json({ message: 'Project with that ID does not exist' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Error finding project' });
            });
    } else {
        res.status(400).json({ error: 'The project_id field is required' });
    };
};

function validateActionId(req, res, next){
    const id = req.params.id 
    actions
        .get(id)
        .then(action => {
            if(action) {
                req.action = action
                next()
            } else {
                res.status(404).json({ message: 'cannot find a project with the specified ID"'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error retriving project'})
        })
}


module.exports = router

  
