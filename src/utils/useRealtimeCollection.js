// src/utils/useRealtimeCollection.js
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function useRealtimeCollection(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(docs);
      },
      (error) => console.error("Realtime listener error:", error)
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [collectionName]);

  return data;
}
