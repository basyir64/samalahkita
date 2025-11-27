import "../../index.css"

export default function ScrollRow({ spans }) {
    return (
        <>
            <div className="relative flex overflow-hidden">
                <div className="whitespace-nowrap animate-scroll">
                    {spans}
                </div>
                <div className="whitespace-nowrap animate-scroll2">
                    {spans}
                </div>
            </div>
        </>
    );
}