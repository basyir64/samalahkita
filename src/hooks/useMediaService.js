import { useEffect } from "react";

export function useMediaService() {
    const BASE_URL = "https://raw.githubusercontent.com/basyir64/samalahkita-media/main/stickers/admin";
    const API_BASE_URL = "https://api.github.com/repos/basyir64/samalahkita-media/contents"

    function loadStickerUrlByFilename(name) {
        return `${BASE_URL}/stickers/admin/${name}`;
    }

    async function loadAllStickerUrls() {
        const result = await fetch(`${API_BASE_URL}/stickers/admin`);
        const files = await result.json();
        return files
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f.name))
            .map(f => f.download_url);
    }

    return {
        BASE_URL,
        loadStickerUrlByFilename,
        loadAllStickerUrls
    }
}