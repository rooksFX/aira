const Component = require('../models/Component');
const _ = require('underscore');

exports.getComponents = async (req, res, next) => {
    try {
        const components = await Component.find();
        // const sortedComponents = _.sortBy(components, 'price');

        components.sort((a, b) => {
            return b.rating - a.rating;
        })

        return res.status(200).json({
            success: true,
            count: components.length,
            data: components
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}
exports.addComponent = async (req, res, next) => {

    try {
        const component = await Component.create(req.body);
    
        return res.status(201).json({
            success: true,
            data: component
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({
                success: false,
                error: messages
            });
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

exports.deleteComponent = async (req, res, next) => {
    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(400).json({
                success: false,
                error: 'No matching component found'
            });
        }
        await component.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}
