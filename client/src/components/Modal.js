import React from 'react'
import { AddComponent } from './AddComponent';

export const Modal = ({ ChildComponent, dismiss }) => {
    return (
        <div className='modal'>
            {/* {(mode === 'add' &&
                <AddComponent mode={mode}/>
            )} */}
            {/* <AddComponent /> */}
            <ChildComponent dismiss={dismiss} />
        </div>
    )
}
