import React from 'react'

const Container = ({children,className}) => {
  return <div className={`w-full max-w-7xl mx-auto px-4 ${className}`}>
      {children}
    </div>;
}

export default Container
