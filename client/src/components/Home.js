import React, { useState } from 'react'
import { BuildForm } from './BuildForm'
import { Components } from './Components'
import { AddComponent } from './AddComponent'

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';

export const Home = () => {
    // const [mode, setMode] = useState('')

    return (
        <div className="home">
            <img className="logo" src="../../logo.png" alt=""/>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className='home-buttons'>
                            <button  className="btn" onClick={() => window.location='/build'}>BUILD</button>
                            <button  className="btn" onClick={() => window.location='/components'}>MANAGE</button>
                            {/* <Link to='/build'>
                                <button >BUILD</button>
                            </Link>
                            <Link to='/components'>
                                <button >MANAGE</button>
                            </Link> */}
                        </div>
                    </Route>
                    <Route path="/build">
                        <button className='btn back-btn' onClick={() => window.location = '/'}>BACK</button>
                        <BuildForm />
                    </Route>
                    <Route path="/components">
                        <button className='btn back-btn' onClick={() => window.location = '/'}>BACK</button>
                        <Components />
                        {/* <AddComponent /> */}
                    </Route>
                </Switch>
            </Router>
            {/* {(!mode && 
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
            )} */}
        </div>
    )
}
