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
import { SetStateAction, useEffect, useState } from 'react';

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

  useEffect(() => {
    getDocs(collection(db, 'users')).then((data) => {
      if (!data.empty) {
        setUsers(data.docs.map((item) => item.data()));
      } else {
        console.log('no data');
      }
    });
  }, [users]);

  return (
    <main className='w-full h-screen'>
      <div className='w-full h-full flex justify-center items-center'>
        <table className='table w-4/12'>
          <thead>
            <tr className='text-black'>
              <th className='border-e-[1px] border-slate-400'>Title</th>
              <th className='border-e-[1px] border-slate-400'>Height</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {users.map((item: any, i: number) => {
              return (
                <tr key={i}>
                  <td className='border-e-[1px] border-slate-400'>
                    {item.name}
                  </td>
                  <td className='border-e-[1px] border-slate-400'>
                    {item.height}
                  </td>
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
