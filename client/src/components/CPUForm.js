import React from 'react'

export const CPUForm = () => {
    return (
        <>
                <h3>ADD CPU</h3>
                <label htmlFor="cpu-model">CPU Model</label>
                <input type="text" id="cpu-model" className="cpu-model-input"/>
                <label htmlFor="cpu-description">CPU Description</label>
                <input type="text" id="cpu-description" className="cpu-description-input"/>
                <label htmlFor="cpu-chipset">CPU Description</label>
                <input type="text" id="cpu-chipset" className="cpu-chipset-input"/>
                <label htmlFor="cpu-rating">CPU Rating</label>
                <input type="number" id="cpu-rating" className="cpu-rating-input"/>
                <div className="button-controls">
                    <button>ADD CPU</button>
                </div>
        </>
    )
}
