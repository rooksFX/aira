import React from 'react'
import { BuildForm } from './BuildForm'
import { Components } from './Components'
import { AddComponent } from './AddComponent'

export const Home = () => {
    return (
        <div className="home">
            <img className="logo" src="../../logo.png" alt=""/>
            <BuildForm />
            <Components />
            <AddComponent />
        </div>
    )
}
