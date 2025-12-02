import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb_cloud_firestore";

export function useAllSituations() {
  const [situations, setSituations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snapshot = await getDocs(collection(db, "situations"));
      setSituations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }

    load();
  }, []);

  return { situations, loading };
}
