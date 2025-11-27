import '../../index.css'

export default function TextSpan( {key, text} ) {

    return (
        <span className=
        "inline-flex m-[10px] tracking-[0.1em] \
        bg-white text-[#030000] px-[20px] py-[15px] \
        rounded-[25px] border border-white transition \
        duration-500 shadow-[-3px_3px_2px_rgba(0,0,0,0.3)]"
        >
            {text}
        </span>
    )
}