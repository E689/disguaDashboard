import React from 'react'

const Spinner = ({className}: {className?: string}) => {
  return (
    <div className={`w-full h-full flex justify-center items-center m-auto ${className}`}>
      <div
        id='spinner'
        className="w-12 h-12 border-8 border-neutral-300 border-b-neutral-900 dark:border-white dark:border-b-gray-500 rounded-full animate-spin"
      />
    </div>
  )
}

export default Spinner