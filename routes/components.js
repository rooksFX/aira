const express = require('express');
const router = express.Router();
const { getComponents, addComponent, updateComponent, deleteComponent } = require('../controllers/componentsController');

router
    .route('/')
    .get(getComponents)
    .post(addComponent)
    .put(updateComponent);

router
    .route('/:id')
    .delete(deleteComponent);

    module.exports = router