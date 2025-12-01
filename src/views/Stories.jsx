import { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Feed from '../components/stories/Feed';
import '../index.css';
import { Link, useParams } from "react-router";
import CreateStoryModal from '../components/stories/CreateStoryModal';

export default function Stories() {
    const params = useParams();
    //get situation by param id from marquee
    const situation = { id: params.situationid, text: "Kucing baru meninggal dunia" };
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className=''>
            <Navbar />
            <div className='grid grid-col justify-center my-20'>
                <div className='text-center'>
                    <div>
                        {situation.id} : {situation.text}
                    </div>
                    {/* <div className='pill-button' onClick={() => setOpen(true)}>
                        + Cerita Baru
                    </div> */}
                    <span className='underline cursor-pointer' onClick={() => setIsOpen(true)}>Tambah cerita baru</span>
                </div>
                <CreateStoryModal isOpen={isOpen} setIsOpen={setIsOpen} situation={situation} />
            </div>
            <Feed />
        </div>
    );
}