import React from 'react';
import BlockElement from './BlockElement'

const GridBlock = (props) => {
  return (
    <div className={`block-${props.size}`} onClick={() => props.onClick(Math.floor(props.id/props.size), props.id%props.size)}>
      <BlockElement {...props}/> 
    </div>
  );
}

export default GridBlock;