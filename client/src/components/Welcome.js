import React from 'react'
import { IconContext } from "react-icons"
import { CgCloseO } from "react-icons/cg";
import { toggleModal } from '../redux/actions/ComponentActions';
import { useDispatch } from 'react-redux'

export default ({ dismiss }) => {
    const dispatch = useDispatch();
    return (
        <div className='dark-card welcome-modal'>
            <div className="content">
                    Welcome to Aira! Tired of being a Console Peasant
                    and want to join the PCMR but clueless how to build
                    a Gaming Rig?

                    <br/><br/>
                    
                    Well you're in the right place! Click the build 
                    button then enter your budget and Aira will try to 
                    configure a Gaming Rig for you.

                    <br/><br/>

                    Want to contribute to the growing list of PC Components?
                    Click the manage button to add, delete or update a component.

                    <br/><br/>

                    <h4>
                        <span className="disclaimer error">
                            DISCLAIMER:
                            <ul>
                                <li>WIP!!! This project is still WIP and subject to change any time I want.</li>
                                <li>PSU is now included in the Build while HSF is going to be next.</li>
                                <li>Manage Page is planned to have a dedicated site, seperate from Aira
                                    and will require Admin Login.
                                </li>
                                <li>I'm currently developing the Mobile App Version on the side.
                                    Actual Build functionlity is already working but need more time to
                                    iron-out the styling and whatnot.
                                </li>
                            </ul>
                        </span>
                    </h4>
            </div>
            <div>
                <button className='btn-dismiss'  onClick={() => {
                    sessionStorage.setItem('aira-welcome-dismissed', true);
                    dismiss(true);
                }}>
                    Dismiss
                </button>
            </div>
        </div>
    )
}
