export function useMediaService() {
    const BASE_URL = "https://raw.githubusercontent.com/basyir64/samalahkita-media/main";

    function loadUrlByFilename(name) {
        return `${BASE_URL}/${name}`;
    }

    return {
        loadUrlByFilename
    }
}