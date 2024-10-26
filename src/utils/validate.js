export const disabledDateInPast = (current) => {
     const today = new Date()
     return current && current < new Date(today.getFullYear(), today.getMonth(), today.getDate())
}