import React from 'react';

const Icon = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    path: {
      fill: props.color
    }
  };

  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox={`0 0 ${props.size} ${props.size}`}
      className="svgIcon"
      id={props.id}>
      <path style={styles.path} d={props.icon} />
    </svg>
  );
};

Icon.defaultProps = {
  size: 20
};

export default Icon;
