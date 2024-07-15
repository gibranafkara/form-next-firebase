import React, { FormEvent } from 'react';

export default function FormInput({
  onSubmitForm,
  onChangeInput,
  datas,
}: {
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  datas: any;
}) {
  return (
    <form
      onSubmit={onSubmitForm}
      className='flex items-center justify-center gap-4'
    >
      <input
        type='text'
        name='name'
        value={datas.name}
        onChange={onChangeInput}
        placeholder='Name...'
        className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
      />
      <input
        type='number'
        name='height'
        value={datas.height}
        onChange={onChangeInput}
        placeholder='Height...'
        className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
      />
      <input
        type='number'
        name='weight'
        value={datas.weight}
        onChange={onChangeInput}
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
