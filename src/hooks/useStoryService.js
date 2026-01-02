import { useEffect, useState } from "react";
import { collection, getDocs, query, addDoc, orderBy, startAfter, limit, updateDoc, increment, doc, getCountFromServer, getAggregateFromServer, sum, runTransaction } from "firebase/firestore";
import { db } from "../fb_cloud_firestore";

// MAKE SURE NPM RUN DEV IS NOT RUNNING WHEN STARTING OR STOPPING EMULATOR
// if using java as backend, intellij idea: modify run/debug configuration and add env var -> FIRESTORE_EMULATOR_HOST=127.0.0.1:8089
// temporarily allow self signed certs (bash session) -> export NODE_TLS_REJECT_UNAUTHORIZED=0
// import and export dev data, and temporarily allow self signed certs (command session)->
// NODE_TLS_REJECT_UNAUTHORIZED=0 firebase emulators:start --import=./firestore-export --export-on-exit=./firestore-export --only firestore

export function useStoryService() {
    const [loading, setLoading] = useState(false);
    const [lastVisibleStory, setLastVisibleStory] = useState({});

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
        try {
            // console.log("fetching...:" + JSON.stringify(constraints, null, 2))
            const first = query(collection(db, "stories"), ...constraints, limit(5));
            const snapshot = await getDocs(first);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLastVisibleStory(snapshot.docs[snapshot.docs.length - 1]);
            return data;

        } catch (error) {
            console.error("Firestore error getting story first page: " + error)
            return false;
        }

    }

    async function loadNextPage(constraints = []) {
        if (!lastVisibleStory) return [];
        try {
            const next = query(collection(db, "stories"), ...constraints, startAfter(lastVisibleStory), limit(5));
            const snapshot = await getDocs(next);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLastVisibleStory(snapshot.docs[snapshot.docs.length - 1]);
            return data;
        } catch (error) {
            console.error("Firestore error getting story first page: " + error)
            return false;
        }
    }

    async function updateViews(story) {
        const storyRef = doc(db, "stories", story.id);
        const situationRef = doc(db, "situations", story.situationId);

        try {
            await runTransaction(db, async (transaction) => {
                transaction.update(storyRef, {
                    views: increment(1),
                });
                transaction.update(situationRef, {
                    totalViews: increment(1),
                });
            });
            // console.log("Transaction successfully committed!");
            return true;
        } catch (e) {
            console.log("Transaction failed: ", e);
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
        save,
        updateViews,
        countAllStories,
        sumAllViews
    };
}


