import'../../index.css';
import { useParams } from "react-router";

export default function Stories() {
    const params = useParams();
    return (
        <div>
            story 1 story 2 etc
            {params.situationid}
        </div>
    );
}