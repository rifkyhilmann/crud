import React from 'react'

export default function InputField({title, value, setValue}) {
  return (
    <div className='w-full h-10  flex items-center'>
        <p
            className='w-28 text-sm  '
        >
            {title}
        </p>
        <input 
            type="text" 
            className='flex-1 h-full rounded border text-sm indent-2 focus:outline-none'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
  )
}
