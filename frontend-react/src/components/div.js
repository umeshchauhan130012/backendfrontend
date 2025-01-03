import React from 'react';

const Div = ({ className, style, children, ...props }) => {
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default Div;