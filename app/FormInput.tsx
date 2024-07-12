import React from 'react';

export default function FormInput() {
  return (
    <form className='flex items-center justify-center gap-4'>
      <input
        type='text'
        placeholder='Name...'
        className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
      />
      <input
        type='number'
        placeholder='Height...'
        className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
      />
      <input
        type='number'
        placeholder='Weight...'
        className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
      />
      <button
        type='submit'
        className='btn btn-outline btn-primary'
      >
        Submit
      </button>
    </form>
  );
}
