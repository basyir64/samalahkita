import '../index.css'
import HomeMarquee from '../components/marquee/HomeMarquee';
import Face from "../components/face/Face";
import Chart from "../components/chart/Chart";
import Footer from '../components/footer/Footer';
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';
import { useInView } from '../hooks/useInView'

export default function App() {
    const { ref, inView } = useInView({ threshold: 0.25 });
    const { setIsFaceTitleVisible } = useOutletContext();

    useEffect(() => {
        if (inView) setIsFaceTitleVisible(true);
        else setIsFaceTitleVisible(false);
    }, [inView]);

    return (
        <div ref={ref} className="">
            <HomeMarquee />
            <div className='mx-auto px-6 max-w-3xl'>
                <Face />
                <Chart />
            </div>
            <Footer />
        </div>
    )
}