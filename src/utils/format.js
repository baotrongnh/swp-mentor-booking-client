export const formatDateToNormal = (dateString) => {
    const [datePart, timePart] = dateString.split(' ')
    const [year, month, day] = datePart.split('-')
    const [hour, minute, second] = timePart.split(':')

    return { date: `${day}/${month}/${year}`, time: `${hour}:${minute}`, second: second }
}

export const formatDataToServer = (dateString) => {
    const [day, month, year] = dateString.split('-')
    return `${year}-${month}-${day}`
}

export function formatCurrencyVND(amount) {
    return `${amount?.toLocaleString("vi-VN")} vnđ`;
}