import '../../index.css';
import { Link } from 'react-router';

export default function Pill({ size, id, name, isSelected, onClick }) {
    return size === "small" ? (
        <span
            onClick={onClick}
            className={`pill-small ${isSelected ? "bg-[#f1efe3]" : "bg-white"}`}
        >
            {name}
        </span>
    ) : (
        <Link to={`/stories/situation/${id}`}>
            <span className="pill">{name}</span>
        </Link>
    );
}