import '../../index.css'
import { Link } from "react-router";

export default function Pill({ id, text }) {

    return (
        <Link to={"/stories/situation/" + id}>
            <span className="pill">
                {text}
            </span>
        </Link>
    )
}