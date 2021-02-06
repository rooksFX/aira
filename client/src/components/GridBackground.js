import React, { useRef, useEffect } from 'react'
import { isMobile, isTablet } from 'react-device-detect';

export default () => {
    const gridContainer = useRef();
    
    useEffect(() => {
        if (!isMobile) {
            let gridItems = gridContainer.current.children;
            for (let i = 0; i < gridItems.length; i++) {
                const negX = (Math.random() * 10 > 5)? '-': '';
                const negY = (Math.random() * 10 > 5)? '-': '';
                gridItems[i].style.transform = `translate(${negX}${Math.random() * 10}px, ${negY}${Math.random() * 10}px)`;
            }
        }

    }, []);

    return (
        <div ref={gridContainer} className="grid-container">
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            <div className="grid-item">
                <div className="plus-container">
                    <div>+</div>
                    <div>+</div>
                    <div>+</div>
                </div>
            </div>
            {!isMobile && 
                <>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="plus-container">
                            <div>+</div>
                            <div>+</div>
                            <div>+</div>
                        </div>
                    </div>
                </>
            }
            
            
            {/* <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div>
            <div className="grid-item">+</div> */}
        </div>
    )
}
