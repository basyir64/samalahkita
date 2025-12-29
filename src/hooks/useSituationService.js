import { useState } from "react";
import { collection, getDocs, query, addDoc, doc, getCountFromServer, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "../fb_emulator_connect";

// MAKE SURE NPM RUN DEV IS NOT RUNNING WHEN STARTING OR STOPPING EMULATOR
// intellij idea: modify run/debug configuration and add env var -> FIRESTORE_EMULATOR_HOST=127.0.0.1:8089
// temporarily allow self signed certs (bash session) -> export NODE_TLS_REJECT_UNAUTHORIZED=0
// import and export dev data, and temporarily allow self signed certs (command session)->
// NODE_TLS_REJECT_UNAUTHORIZED=0 firebase emulators:start --import=./firestore-export --export-on-exit=./firestore-export --only firestore

export function useSituationService() {

  // Load all situations
  async function loadAll() {
    try {
      // console.log("fetching situations from service")
      const snapshot = await getDocs(collection(db, "situations"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (error) {
      console.error("Error getting situations: " + error);
      return false;
    }
  };

  // Load queried situations
  async function loadByQuery(constraints) {

    try {
      const q = query(collection(db, "situations"), ...constraints);
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // console.log(JSON.stringify(snapshot.docs, null, 2))

      return data; 
    } catch (error) {
      console.error("Error loadByQuery situations: " + error)
      return false;
    }
  };

  async function save(situation) {
    let ref;
    try {
      // console.log(JSON.stringify(situation, null, 2))
      ref = await addDoc(collection(db, "situations"), situation);
    } catch (error) {
      console.error("Error saving situation: " + error);
      return false;
    } finally {
      if (ref?.id) return ref.id;
      else return false
    }
  }

  async function countAllSituations() {
    try {
      const coll = collection(db, "situations");
      const snapshot = await getCountFromServer(coll);
      const count = snapshot.data().count;
      // console.log('count: ', count);
      return count;
    } catch (error) {
      console.error("Firestore Error getting count: " + error);
      return false;
    }
  }

  async function saveMultiple(situationNames) {
    try {
      const batch = writeBatch(db);
      situationNames.forEach(name => {
        // console.log("saving " + name);
        const ref = doc(collection(db, "situations"));
        batch.set(ref, {
          name: name,
          nameLength: name.length,
          createdAt: serverTimestamp(),
          storiesCount: 0,
          totalViews: 0,
          onDisplay: false
        });
      });
      await batch.commit();
    } catch (error) {
      console.error("Error batch saving situations: " + error);
    }
  }

  return {
    loadAll,
    loadByQuery,
    save,
    countAllSituations,
    saveMultiple
  };
}


