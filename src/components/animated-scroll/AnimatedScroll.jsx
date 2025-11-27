import TextSpan from "./TextSpan";
import "../../index.css"

function randomSort(arr) {
  	return arr
    	.map((val) => ({ val, sort: Math.random() }))
    	.sort((a, b) => a.sort - b.sort)
    	.map(({ val }) => val);
}

export default function AnimatedScroll({ stuffs }) {

    const spans = stuffs.map(stuff =>
        <TextSpan key={stuff.id} text={stuff.name} />
    );

    return (
        <>
            <div className="relative flex overflow-hidden">
                <div className="whitespace-nowrap animate-scroll">
                    {spans}
                </div>
                <div className="whitespace-nowrap animate-scroll2">
                    <div className="flex">{spans}</div>
                </div>
            </div>
            <div className="relative flex overflow-hidden">
                <div className="whitespace-nowrap animate-scroll">
                    {spans}
                </div>
                <div className="whitespace-nowrap animate-scroll2">
                    <div className="flex">{spans}</div>
                </div>
            </div>
            <div className="relative flex overflow-hidden">
                <div className="whitespace-nowrap animate-scroll">
                    {spans}
                </div>
                <div className="whitespace-nowrap animate-scroll2">
                    <div className="flex">{spans}</div>
                </div>
            </div>
        </>
    )
}