import { useTheme } from "../theme-context";

export function useMediaService() {
    const BASE_URL = "https://cdn.jsdelivr.net/gh/basyir64/samalahkita-media@main";
    const API_URL = "https://data.jsdelivr.com/v1/packages/gh/basyir64/samalahkita-media@main";

    const STICKERS_BASE_URL = `${BASE_URL}/stickers/admin`;
    const CONCEALER_BASE_URL = `${BASE_URL}/conceal`;


    const { isDark } = useTheme();
    const SYSTEM_ICON_BASE_URL = `${BASE_URL}/system${isDark ? '/white-fill' : ''}`;

    async function loadAllProfileUrls() {
        const folderPath = "stickers/admin";
        const response = await fetch(`${API_URL}`);
        const data = await response.json();

        // 1. Navigate to the specific subfolder
        const pathParts = folderPath.split('/');
        let currentLevel = data.files;

        for (const part of pathParts) {
            const found = currentLevel.find(f => f.name === part && f.type === "directory");
            currentLevel = found ? found.files : [];
        }

        // 2. Map the files into usable CDN URLs
        return currentLevel
            .filter(file => file.type === "file")
            .map(file => `${STICKERS_BASE_URL}/${file.name}`);
    }

    async function resourceExistsAndHealthy(url) {
        try {
            const res = await fetch(url, { method: "HEAD" });
            return res.ok; // true if status is 200–299
        } catch (err) {
            return false; // network error
        }
    }

    return {
        STICKERS_BASE_URL,
        SYSTEM_ICON_BASE_URL,
        CONCEALER_BASE_URL,
        loadAllProfileUrls,
        resourceExistsAndHealthy
    }
}