import { useEffect } from "react";

export function useMediaService() {
    const BASE_URL = "https://raw.githubusercontent.com/basyir64/samalahkita-media/main";
    const API_URL = "https://api.github.com/repos/basyir64/samalahkita-media/contents";

    const STICKERS_BASE_URL = `${BASE_URL}/stickers/admin`;
    const STICKERS_API_URL = `${API_URL}/stickers/admin`;

    const PROFILES_BASE_URL = `${BASE_URL}/profiles`;
    const PROFILES_API_URL = `${API_URL}/profiles`;

    const SYSTEM_ICON_BASE_URL = `${BASE_URL}/system`;

    function loadStickerUrlByFilename(name) {
        return `${STICKERS_BASE_URL}/stickers/admin/${name}`;
    }

    async function loadAllStickerUrls() {
        const result = await fetch(`${STICKERS_API_URL}`);
        const files = await result.json();
        return files
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f.name))
            .map(f => f.download_url);
    }

    async function loadAllProfileUrls() {
        const result = await fetch(`${STICKERS_API_URL}`);
        const files = await result.json();
        return files
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f.name))
            .map(f => f.download_url);
    }

    return {
        STICKERS_BASE_URL,
        PROFILES_BASE_URL,
        SYSTEM_ICON_BASE_URL,
        loadAllStickerUrls,
        loadAllProfileUrls
    }
}