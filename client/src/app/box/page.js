'use client'
import React from 'react'
import { useSelector } from 'react-redux'


const boxSliceTest = () => {
    const {color, height} = useSelector (state=>state.box)
  return (
    <div>boxSliceTest<br/>
        {JSON.stringify(color)} <br/>
        {JSON.stringify(height)}
    </div>
  )
}

export default boxSliceTest