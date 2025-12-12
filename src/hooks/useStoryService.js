import { useEffect, useState } from "react";
import { collection, getDocs, query, addDoc, orderBy, startAfter, limit, updateDoc, increment, doc, getCountFromServer, getAggregateFromServer, sum, runTransaction } from "firebase/firestore";
import { db } from "../fb_emulator_connect";

// MAKE SURE NPM RUN DEV IS NOT RUNNING WHEN STARTING OR STOPPING EMULATOR
// intellij idea: modify run/debug configuration and add env var -> FIRESTORE_EMULATOR_HOST=127.0.0.1:8089
// temporarily allow self signed certs (bash session) -> export NODE_TLS_REJECT_UNAUTHORIZED=0
// import and export dev data, and temporarily allow self signed certs (command session)->
// NODE_TLS_REJECT_UNAUTHORIZED=0 firebase emulators:start --import=./firestore-export --export-on-exit=./firestore-export --only firestore

export function useStoryService() {
    const [loading, setLoading] = useState(false);
    const [lastVisibleStory, setLastVisibleStory] = useState({});

    // Load all stories
    async function loadAll() {
        setLoading(true);

        const snapshot = await getDocs(collection(db, "stories"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setTimeout(() => (
            setLoading(false)
        ), 1000);
        return data;

    };

    // save story
    async function save(story) {
        // const docRef = await addDoc(collection(db, "stories"), story);

        const storyRef = doc(collection(db, "stories"));
        const situationRef = doc(db, "situations", story.situationId);

        try {
            await runTransaction(db, async (transaction) => {
                transaction.set(storyRef, story);
                transaction.update(situationRef, {
                    storiesCount: increment(1),
                });
            });
            // console.log("Transaction successfully committed!");
            return true;
        } catch (e) {
            console.log("Transaction failed: ", e);
            return false;
        }


        return docRef;
    }

    // Load queried stories
    async function loadByQuery(constraints = []) {
        setLoading(true);

        const q = query(collection(db, "stories"), ...constraints);
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(JSON.stringify(snapshot.docs, null, 2))

        setLoading(false);
        return data;
    };

    async function loadFirstPage(constraints = []) {
        // const first = query(collection(db, "cities"), orderBy("population"), limit(25));
        const first = query(collection(db, "stories"), ...constraints, orderBy("createdAt", "desc"), limit(1));
        const snapshot = await getDocs(first);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setLastVisibleStory(snapshot.docs[snapshot.docs.length - 1]);
        return data;
    }

    async function loadNextPage(constraints = []) {
        if (!lastVisibleStory) return [];
        const next = query(collection(db, "stories"), ...constraints, orderBy("createdAt", "desc"), startAfter(lastVisibleStory), limit(1));
        const snapshot = await getDocs(next);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLastVisibleStory(snapshot.docs[snapshot.docs.length - 1]);

        return data;
    }

    async function updateViews(id) {
        try {
            const storyRef = doc(db, "stories", id);
            await updateDoc(storyRef, {
                views: increment(1)
            });
            return true;
        } catch (error) {
            console.log("Error updating views: " + error)
            return false;
        }
    }

    async function countAllStories() {
        try {
            const coll = collection(db, "stories");
            const snapshot = await getCountFromServer(coll);
            const count = snapshot.data().count;
            // console.log('count: ', count);
            return count;
        } catch (error) {
            console.error("Firestore Error getting count: " + error);
            return false;
        }
    }

    async function sumAllViews() {
        try {
            const coll = collection(db, 'stories');
            const snapshot = await getAggregateFromServer(coll, {
                totalViews: sum('views')
            });
            const viewsSum = snapshot.data().totalViews;
            return viewsSum;

        } catch (error) {
            console.error("Firestore Error getting sum: " + error);
            return false;
        }
    }

    return {
        loading,
        loadFirstPage,
        loadNextPage,
        loadByQuery,
        // loadById,
        save,
        updateViews,
        countAllStories,
        sumAllViews
    };
}


