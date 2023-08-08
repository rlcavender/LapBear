import React from "react";

function InputBar({name, input}) {
    const inputBarStyle = {
        width: `${input}%`,
        height: '20px',
        backgroundColor: 'red',
        //transition: 'width 0.3s ease-in-out',
    };

    return (
        <div className='inputBar'>
            {name}
            <div id="containerBar" className='containerBar'>
                <div id="inputBar" style={inputBarStyle}/>
            </div>
        </div>
    );
}

export default InputBar;
