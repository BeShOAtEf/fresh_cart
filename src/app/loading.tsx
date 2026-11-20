'use client'
import React from 'react'
import { Puff } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Puff
  height="100"
  width="100"
  radius="9"
  color="#4fa94d"
  ariaLabel="rgb(10 ,173 , 10)"
  wrapperStyle={{ margin: '20px' }}
  wrapperClass=""
  visible={true}
/>
    </div>
  )
}
