import '../../index.css';

import { useState } from "react";

export default function CardStack({ stack: list }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const onCardClick = () => {
        setActiveIndex((i) => (i + 1) % list.length);
    };

    return (
        <div className="relative w-[800px] h-[400px] mt-45 mb-10">
            {list.map((card, idx) => {

                // compute offset order: rotate so activeIndex becomes top
                const order = (idx - activeIndex + list.length) % list.length;
                const offsetY = order * -40; // px or rem
                const zIndex = list.length - order;

                return (
                    <div
                        key={card.id}
                        onClick={order === 0 ? onCardClick : undefined}
                        className="pill-stack-card absolute inset-0 transition-all duration-500 ease-in-out"
                        style={{
                            transform: `translateY(${offsetY}px)`,
                            zIndex,
                        }}
                    >
                        <div className='flex justify-between mb-4'>
                            <span className='text-xl'>{card.content}</span>
                            <span className='flex gap-4'>
                                <span>Cerita</span>
                                <span>Bacaan</span>
                            </span>
                        </div>
                        <div className='ml-2'>
                            <div className='text-sm'>
                                #1 Saya ada adik beradik yang kesemuanya berlainan jantina dari saya
                            </div>
                            <div className='text-sm'>
                                #2 Dikutuk di tempat kerja
                            </div>
                            <div className='text-sm'>
                                #3 Ibu bapa terlalu mengongkong
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

