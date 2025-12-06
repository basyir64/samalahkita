import '../index.css'
import HomeMarquee from '../components/marquee/HomeMarquee';
import Face from "../components/face/Face";
import Stats from "../components/stats/Stats";
import UserGuide from "../components/user-guide/UserGuide";

export default function App() {

    return (
        <div className="">
            <HomeMarquee />
            <Face />
            <UserGuide />
            <Stats />
        </div>
    )
}