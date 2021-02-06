import React, { useState } from 'react'
import { BuildForm } from './BuildForm'
import { Components } from './Components'
import { AddComponent } from './AddComponent'
import GridBackground from './GridBackground'

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import { ReactComponent as AiraLogo } from '../aira-logo-1.svg';

export const Home = () => {
    // const [mode, setMode] = useState('')

    return (
        <div className="home">
            <GridBackground />
            <AiraLogo />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className='home-buttons'>
                            <div  className="btn glitch" onClick={() => window.location='/build'}>
                                <div>B U I L D</div>
                                <div>B U I L D</div>
                                <div>B U I L D</div>
                            </div>
                            <div  className="btn glitch" onClick={() => window.location='/components'}>
                                <div>MANAGE</div>
                                <div>MANAGE</div>
                                <div>MANAGE</div>
                            </div>
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
