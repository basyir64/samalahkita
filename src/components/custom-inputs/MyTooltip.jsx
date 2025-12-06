import '../../index.css';

export default function MyTooltip({ isOpen, setIsOpen, className }) {
    return (
        <span
            className={`my-tooltip ${isOpen ? "bg-[#f1efe3]" : "bg-white"} ${className}`}
            onClick={() => setIsOpen(!isOpen)}>
            i
        </span>
    );
}