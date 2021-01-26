import React, { useState } from 'react'
import { BuildForm } from './BuildForm'
import { Components } from './Components'
import { AddComponent } from './AddComponent'

export const Home = () => {
    const [mode, setMode] = useState('')

    return (
        <div className="home">
            <img className="logo" src="../../logo.png" alt=""/>
            {(!mode && 
                <div className='home-buttons'>
                    <button onClick={() => setMode('build')}>BUILD</button>
                    <button onClick={() => setMode('manage')}>MANAGE</button>
                </div>
            )}
            {(mode === 'build' && 
                <>
                    <button className='back-btn' onClick={() => setMode('')}>BACK</button>
                    <BuildForm />
                </>
            )}
            {(mode === 'manage' && 
                <>
                    <button className='back-btn' onClick={() => setMode('')}>BACK</button>
                    <Components />
                    <AddComponent />
                </>
            )}
        </div>
    )
}
