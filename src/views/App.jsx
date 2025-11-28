import Marquee from "../components/marquee/Marquee"
import Face from "../components/face/Face";
import Navbar from "../components/navbar/Navbar";
import '../index.css'

export default function App() {

    return (
        <div className="flex flex-col">
            <Navbar/>
            <Marquee/>
            <Face/>
        </div>
    )
}