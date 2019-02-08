/**
 * Date Functions
 * @param date
 */
export const getDate = date => date ? new Date(date).getDate() : new Date().getDate();
export const getMonth = date => date ? new Date(date).getMonth() : new Date().getMonth();
export const getYear = date => date ? new Date(date).getFullYear() : new Date().getFullYear();
export const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toUpperCase() : letter.toLowerCase();
    });
};
/**
 * Get Day
 * @param date
 * @returns {string}
 */
export const getDay = (date) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[new Date(date * 1000).getDay()];
}
