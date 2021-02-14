const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
    model: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    brand: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    chipset: {
        type: String,
        trim: true,
        required: [false, '']
    },
    socket: {
        type: String,
        trim: true,
        required: [false, '']
    },
    cpuMake: {
        type: String,
        trim: true,
        required: [false, '']
    },
    gpuMake: {
        type: String,
        trim: true,
        required: [false, '']
    },
    size: {
        type: Number,
        required: [false, '']
    },
    ssdType: {
        type: String,
        trim: true,
        required: [false, '']
    },
    ramSlots: {
        type: Number,
        required: [false, '']
    },
    formFactor: {
        type: String,
        trim: true,
        required: [false, '']
    },
    tdp: {
        type: Number,
        required: [false, '']
    },
    watts: {
        type: Number,
        required: [false, '']
    },
    efficiency: {
        type: String,
        trim: true,
        required: [false, '']
    },
    modular: {
        type: String,
        trim: true,
        required: [false, '']
    },
    price: {
        type: Number,
        required: [true, 'Please add a positive number']
    },
    rating: {
        type: Number,
        required: [false, '']
    },
    createdAt: {
        type: Date,
        default: Date.now    }
});


module.exports = mongoose.model('components', ComponentSchema);