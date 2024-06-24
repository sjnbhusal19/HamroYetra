'use client'
import { changeHeight, changeShape, changeWidth } from '@/redux/reducerSlices/boxSlice'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const boxSliceTest = () => {
    const dispach = useDispatch()
    const {height, width, backgroundColor,borderRadius} = useSelector(state=>state.box)
  return (
    <div>
      <div style={{backgroundColor: backgroundColor, height: height, width:width , borderRadius: borderRadius}}>

      </div>
    <Button onClick={()=>dispach(changeWidth())}>+Width</Button>
    <Button onClick={()=>dispach(changeHeight())}>+Height</Button>
    <Button onClick={()=>dispach(changeShape())}>Change to circle</Button>
    <Input placeholder='Enter color'/>

    </div>
  )
}
export default boxSliceTest