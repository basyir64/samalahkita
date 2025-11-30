import '../../index.css'
import CardStack from './CardStack';

export default function Stats() {
    const stack = [
        { id: 1, content: "Lelaki Malaysia" },
        { id: 2, content: "Perempuan Malaysia" },
        { id: 3, content: "Selangor" },
        { id: 4, content: "Kelantan" },
        { id: 5, content: "Berumur 25-30 Tahun" }
    ];

    return (
        <div className='grid grid-col justify-center'>
            <div className='grid gird-col my-4'>
                <span className='text-center text-lg'>Luahan Terbanyak Mengikut Demografi</span>
                <span className='text-center underline'>Lihat semua carta</span>
            </div>
            <CardStack stack={stack} />
        </div>
    );
}