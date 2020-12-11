import React from 'react'

export const Header = () => {
    return (
        <>
            <header>
                <h1>AIRA</h1>
            </header>
            <nav className="tabs">
                <a className="tab" href="/">Components</a>
                <a className="tab" href="/add">Add Component</a>
                <a className="tab" href="/build">Build</a>
            </nav>
        </>
    )
}
