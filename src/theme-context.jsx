import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {

    const [isDark, setIsDark] = useState(() => {
        return localStorage.theme === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            root.classList.remove("dark");
            localStorage.theme = "light";
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(v => !v) }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return ctx;
}

