'use client';

// FIREBASE
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import FormInput from './FormInput';

const firebaseConfig = {
  apiKey: 'AIzaSyBJk_dUeh0pp83_1mWVhZaSmbdA17CG8po',
  authDomain: 'personal-e040f.firebaseapp.com',
  databaseURL:
    'https://personal-e040f-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'personal-e040f',
  storageBucket: 'personal-e040f.appspot.com',
  messagingSenderId: '808091356379',
  appId: '1:808091356379:web:fe9b29b6c5008406ae10fe',
  measurementId: 'G-XR0KLY9JNT',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// datas.map((item) => {
//   addDoc(collection(db, 'users'), item);
// });

export default function Home() {
  const [users, setUsers] = useState<DocumentData>([]);
  const [newData, setNewData] = useState<any>({
    name: '',
    height: 0,
    weight: 0,
  });

  const fetchData = async () => {
    getDocs(collection(db, 'users')).then((querySnapShot) => {
      const updateData = querySnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUsers(updateData);
    });
  };

  useEffect(() => {
    fetchData();
  }, [users]);

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
      height: 0,
      weight: 0,
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
        <table className='table table-zebra max-w-4xl'>
          <thead className='border-b-[1px] border-black'>
            <tr className='text-black text-lg'>
              <th className=''>Name</th>
              <th className=''>Height</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {users?.map((item: any, i: number) => {
              return (
                <tr key={i}>
                  <td className=''>{item.name}</td>
                  <td className=''>{item.height}</td>
                  <td>{item.weight}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
