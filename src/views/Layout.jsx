import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { useRef, useEffect, useState } from "react";
import { useSituationService } from "../hooks/useSituationService";
import Footer from "../components/footer/Footer";

export default function Layout() {
  const { loadAll } = useSituationService();
  const allSituationsContextRef = useRef([]);
  const [isSituationsContextLoading, setIsSituationsContextLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isFaceTitleVisible, setIsFaceTitleVisible] = useState(false);

  useEffect(() => {
    async function getAllSituations() {
      // console.log("fetching situations from layout")
      const result = await loadAll();
      if (!result) {
        setMessage("There was a problem connecting to Google Firebase. We are fixing it, please try again later.")
        return;
      }
      allSituationsContextRef.current = result;
      setIsSituationsContextLoading(false);
    }

    getAllSituations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isFaceTitleVisible={isFaceTitleVisible} />
      <main className="flex-1">
        {
          isSituationsContextLoading ?
            <div className="text-center">Loading...</div> :
            <Outlet context={{ allSituationsContextRef, setIsFaceTitleVisible }} />
        }
        <div className="text-center">{message}</div>
      </main>
      {/* <Footer/> */}
    </div>
  );
}
