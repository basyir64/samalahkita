import TextSpan from "./TextSpan";
import "../../index.css"

export default function AnimatedScroll({ stuffs }) {

    const spans = stuffs.map(stuff =>
        <TextSpan key={stuff.id} text={stuff.text} />
    );

    return (
        <>
            <div className="relative flex overflow-hidden">
                <div className="whitespace-nowrap animate-scroll">
                    {spans}
                    {spans}
                </div>
                {/* <div className="whitespace-nowrap animate-scroll2">
                    <div className="flex">{spans}</div>
                </div> */}
            </div>
            {/* <div className="">
                {spans}
            </div>
            <div className="flex ">
                {spans}
            </div> */}
        </>
    )
}