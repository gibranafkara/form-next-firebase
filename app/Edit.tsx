'use client';

import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { db } from './firebase';

export default function EditButton(props: {
  onSetEdit: Dispatch<SetStateAction<ReactNode>>;
  users: DocumentData;
}) {
  const [edit, setEdit] = useState<any>({
    name: props.users.name,
  });

  function onEdit() {
    props.onSetEdit(null);
  }

  const handleEditInput = (e: any) => {
    e.preventDefault();

    const { name, value } = e.target;
    setEdit((prevDataInput: any) => ({
      ...prevDataInput,
      [name]: value,
    }));

    console.log(edit);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    updateDoc(doc(db, 'users', props.users.id), {
      name: edit.name,
      height: edit.height,
      weight: edit.weight,
    });
  };

  return (
    <div
      className='flex fixed top-0 left-0 items-center justify-center bg-black bg-opacity-30 w-full h-full'
      onClick={onEdit}
    >
      <div
        className='w-1/2'
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center gap-4  bg-orange-300 p-5'
        >
          <h1>Update Data</h1>
          <input
            type='text'
            name='name'
            defaultValue={props.users.name}
            onChange={handleEditInput}
            placeholder='Name...'
            className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
          />
          <input
            type='number'
            name='height'
            onChange={handleEditInput}
            defaultValue={props.users.height}
            placeholder='Height...'
            className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
          />
          <input
            type='number'
            name='weight'
            onChange={handleEditInput}
            defaultValue={props.users.weight}
            placeholder='Weight...'
            className='input input-ghost bg-slate-600/10 w-full max-w-xs transition-all ease-in-out hover:bg-slate-400/80 hover:placeholder:text-white'
          />
          <button
            type='submit'
            className='btn btn-primary'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
