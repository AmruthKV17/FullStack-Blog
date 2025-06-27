import React from 'react'

const Logo = ({clsname}) => {
  return (
    <div>
      <img src="/logonew.png" className={` size-16 ${clsname}`} />
    </div>
  )
}

export default Logo
