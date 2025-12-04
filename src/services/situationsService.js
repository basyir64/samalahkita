import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fb_emulator_connect";

// MAKE SURE NPM RUN DEV IS NOT RUNNING WHEN STARTING OR STOPPING EMULATOR
// modify run/debug configuration and add env var -> FIRESTORE_EMULATOR_HOST=127.0.0.1:8089
// temporarily allow self signed certs (bash session) -> export NODE_TLS_REJECT_UNAUTHORIZED=0
// import and export dev data, and temporarily allow self signed certs (command session)->
// NODE_TLS_REJECT_UNAUTHORIZED=0 firebase emulators:start --import=./firestore-export --export-on-exit=./firestore-export --only firestore

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
