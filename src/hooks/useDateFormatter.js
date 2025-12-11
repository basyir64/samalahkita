export default function useDateFormatter(fsDate) {
    if (!fsDate) return {};

    const jsDate = fsDate.toDate();
    const date = jsDate.getDate().toString().padStart(2, '0');
    const month = (jsDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed!
    const year = jsDate.getFullYear();

    const hours = jsDate.getHours().toString().padStart(2, '0');
    const minutes = jsDate.getMinutes().toString().padStart(2, '0');
    const seconds = jsDate.getSeconds().toString().padStart(2, '0');

    // Final formatted string
    const formattedDate = `${date}/${month}/${year}`; // Example: 15/03/2023
    const formattedTime = `${hours}:${minutes}`; // Example: 10:30:45
    const fullFormat = `${formattedDate} ${formattedTime}`;

    return {
        formattedDate, 
        formattedTime
    }
}