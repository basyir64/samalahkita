import '../index.css'
import Marquee from "../components/marquee/Marquee"
import Face from "../components/face/Face";
import Stats from "../components/stats/Stats";
import UserGuide from "../components/user-guide/UserGuide";

export default function App() {

    return (
        <div className="">
            <Marquee />
            <Face />
            <UserGuide />
            <Stats />
        </div>
    )
}