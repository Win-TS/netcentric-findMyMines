import React from 'react';
import bombImg from '../assets/bomb.svg'

const BlockElement = (props) => {
    if (props.revealed) {
        if (props.mine) {
            return (<img src={bombImg} alt='bomb'/>);
        } else {
            return (<p>Opened</p>);
        }
    }
    return (<p>Block</p>);
}

export default BlockElement;