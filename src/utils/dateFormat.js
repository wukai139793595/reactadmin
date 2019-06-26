export function dateFormat(time) {
    let oDate = new Date(time);
    return `${oDate.getFullYear()}-${oDate.getMonth()}-${oDate.getDate()} ${oDate.getHours()}:${oDate.getMinutes()}:${oDate.getSeconds()}`
}