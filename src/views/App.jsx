import '../index.css'
import HomeMarquee from '../components/marquee/HomeMarquee';
import Face from "../components/face/Face";
import Features from "../components/features/Features";
import Chart from "../components/chart/Chart";

export default function App() {

    return (
        <div className="">
            <HomeMarquee />
            <Face />
            <Chart />
            <Features />
        </div>
    )
}