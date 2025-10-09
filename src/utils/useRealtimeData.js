// src/utils/useRealtimeData.js
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function useRealtimeData(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docs);
    });

    return () => unsub();
  }, [collectionName]);

  return data;
}
