import AnimatedScroll from "../components/animated-scroll/AnimatedScroll"

export default function App() {
    const situations = [
        {
            id: 1,
            text: "sit 1"
        },
        {
            id: 2,
            text: "sit 2"
        },
        {
            id: 3,
            text: "sit 3"
        }
    ]
    return (
        <>
            <AnimatedScroll stuffs={situations}/>
        </>
    )
}