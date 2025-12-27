import '../index.css'
import HomeMarquee from '../components/marquee/HomeMarquee';
import Face from "../components/face/Face";
import Chart from "../components/chart/Chart";
import Footer from '../components/footer/Footer';

export default function App() {
    
    return (
        <div className="">
            <HomeMarquee />
            <div className='mx-auto px-6 max-w-3xl'>
                <Face />
                <Chart />
            </div>
            <Footer />
        </div>
    )
}