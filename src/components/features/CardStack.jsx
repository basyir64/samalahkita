import '../../index.css';
import { useEffect, useState } from "react";
import { useMediaService } from '../../hooks/useMediaService';

export default function CardStack({ stack: list }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const onCardClick = () => {
        setActiveIndex((i) => (i + 1) % list.length);
    };

    const { SYSTEM_ICON_BASE_URL, resourceExistsAndHealthy } = useMediaService();
    const [isResourceOK, setIsResourceOK] = useState(false);

    useEffect(() => {
        async function tryResource(url) {
            const result = await resourceExistsAndHealthy(url);
            if (result) {
                setIsResourceOK(true);
            }
        }

        tryResource(`${SYSTEM_ICON_BASE_URL}/${list[0].imageName}`)
    }, [])

    return (
        <div className="relative w-[500px] h-[1000px] mt-45 mb-10">
            {list.map((card, idx) => {

                // compute offset order: rotate so activeIndex becomes top
                const order = (idx - activeIndex + list.length) % list.length;
                const offsetY = order * -50; // px or rem
                const zIndex = list.length - order;

                return (
                    <div
                        key={card.id}
                        onClick={order === 0 ? onCardClick : undefined}
                        className={`pill-stack-card absolute inset-0 transition-all duration-500 ease-in-out bg-cover bg-center h-128`}
                        style={{
                            transform: `translateY(${offsetY}px)`,
                            zIndex,
                            backgroundImage: `url(${SYSTEM_ICON_BASE_URL}/${card.imageName})`
                        }}
                    >
                        <div className={`${isResourceOK ? "text-white" : "text-black"} rounded-[25px] px-[30px] py-[25px] bg-white/10 backdrop-blur-md`}>
                            {card.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

