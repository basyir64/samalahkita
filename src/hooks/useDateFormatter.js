export default function useDateFormatter(fsDate) {
    if (!fsDate) return {};

    // If it's a Firestore Timestamp → convert
    const jsDate = typeof fsDate.toDate === 'function' 
        ? fsDate.toDate()
        : fsDate instanceof Date
            ? fsDate
            : null;

    if (!jsDate) return {};

    const dd = jsDate.getDate().toString().padStart(2, '0');
    const mm = (jsDate.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = jsDate.getFullYear();

    const hours = jsDate.getHours().toString().padStart(2, '0');
    const minutes = jsDate.getMinutes().toString().padStart(2, '0');
    // const seconds = jsDate.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? "pm" : "am";

    return {
        formattedDate: `${dd}/${mm}/${yyyy}`,
        formattedTime: `${hours % 12 || 12}:${minutes} ${period}`,
    };
}
