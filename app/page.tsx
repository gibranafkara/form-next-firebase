'use client';

// FIREBASE
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import FormInput from './FormInput';
import { users as datas } from './users.json';
import EditButton from './Edit';
import { db } from './firebase';

// datas.map((item) => {
//   addDoc(collection(db, 'users'), item);
// });

export default function Home() {
  const [users, setUsers] = useState<DocumentData>([]);
  const [newData, setNewData] = useState<any>({
    name: '',
    height: '',
    weight: '',
  });
  const [edit, setEdit] = useState<React.ReactNode>(null);

  // const fetchData = async () => {
  //   getDocs(collection(db, 'users')).then((querySnapShot) => {
  //     const updateData = querySnapShot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));

  //     setUsers(updateData);
  //   });
  // };
  function fetchData() {
    onSnapshot(collection(db, 'users'), (snapshot) => {
      let users: any = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {}, [users]);

  function handleChangeInput(e: any) {
    const { name, value } = e.target;
    setNewData((prevDataInput: any) => ({
      ...prevDataInput,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, 'users'), {
      name: newData.name,
      height: newData.height,
      weight: newData.weight,
    });

    setNewData({
      name: '',
      height: '',
      weight: '',
    });
  };

  return (
    <main className='w-full h-screen'>
      <div className='w-full h-full flex flex-col justify-center items-center gap-10'>
        <h1 className='text-3xl font-bold'>Data From Firebase Databases</h1>
        <div className='overflow-x-auto max-w-4xl'>
          <FormInput
            onSubmitForm={handleSubmit}
            onChangeInput={handleChangeInput}
            datas={newData}
          />
        </div>
        <table className='table table-zebra max-w-6xl'>
          <thead className='border-b-[1px] border-black text-[20px]'>
            <tr className='text-black text-lg'>
              <th className=''>Name</th>
              <th className=''>Height</th>
              <th>Weight</th>
              <th className=''></th>
            </tr>
          </thead>
          <tbody className='text-black box-border text-[18px]'>
            {users?.map((item: any, i: number) => {
              return (
                <tr key={i}>
                  <td className=''>{item.name}</td>
                  <td className=''>{item.height}</td>
                  <td>{item.weight}</td>
                  <td className=' w-1/6'>
                    <div className='flex justify-center gap-3'>
                      <button
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                          setEdit(
                            <>
                              <EditButton
                                onSetEdit={setEdit}
                                users={item}
                              />
                            </>
                          );
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className='btn btn-sm btn-error'
                        onClick={() => {
                          const isConfirm = window.confirm('Are you sure?');

                          if (isConfirm === true) {
                            deleteDoc(doc(db, 'users', item.id));
                          } else {
                            return;
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!!edit && edit}
      </div>
    </main>
  );
}
