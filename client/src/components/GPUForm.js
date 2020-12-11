import React from 'react'

export const GPUForm = () => {
    return (
        <>
                <h3>ADD GPU</h3>
                <label htmlFor="gpu-model">GPU Model</label>
                <input type="text" id="gpu-model" className="gpu-model-input"/>
                <label htmlFor="gpu-description">GPU Description</label>
                <input type="text" id="gpu-description" className="gpu-description-input"/>
                <label htmlFor="gpu-rating">GPU Rating</label>
                <input type="number" id="gpu-rating" className="gpu-rating-input"/>
                <div className="button-controls">
                    <button>ADD GPU</button>
                </div>
        </>
    )
}
