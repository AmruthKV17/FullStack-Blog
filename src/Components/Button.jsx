import React from 'react'

const Button = ({
    children, className = '',type = "button", ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${className}`} type={type} {...props}> 
        {children}
    </button>
  )
}

export default Button
