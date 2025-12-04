import { useState } from 'react';
import '../../index.css';

export default function MySearchbar() {
    const [searchText, setSearchText] = useState("");
    function handleSearchTextChange(searchText) {
        setSearchText(searchText);
    }

    return (
        <div className="relative">   
            <input
                className="pill-searchbar"
                type="text"
                autoFocus={true}
                value={searchText}
                onChange={(e) => handleSearchTextChange(e.target.value)}
            />

            {searchText && (
                <div className="pill-searchresult">
                    <div className='pill-searchresult-item'>Tambah situasi baru</div>
                    <div className='pill-searchresult-item'>Tambah situasi baru</div>
                    <div className='pill-searchresult-item'>Tambah situasi baru</div>
                </div>
            )}
        </div>
    );
}