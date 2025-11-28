import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div 
        className='absolute top-0 right-0 bottom-0 left-0 m-auto w-[3em] h-10 md:h-32 z-50'
        >
        <TailSpin
  visible={true}
  height="80"
  width="180"
  color="rgb(219 39 119)"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
        </div>
    )
}

export default Loader