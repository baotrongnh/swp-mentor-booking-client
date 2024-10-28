export const disabledDateInPast = (current) => {
     const today = new Date()
     return current && current < new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

export const disableTime = () => {
     const now = new Date()
     const currentHour = now.getHours()
     const currentMinute = now.getMinutes()

     return {
          disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
          disabledMinutes: (selectedHour) =>
               selectedHour === currentHour
                    ? Array.from({ length: currentMinute }, (_, i) => i)
                    : []
     }
}

export const disableNotThing = () => {
     return []
}

export const getDateNow = () => {
     const today = new Date()
     const year = today.getFullYear()
     const month = String(today.getMonth() + 1).padStart(2, '0')
     const day = String(today.getDate()).padStart(2, '0')
     const todayFormatted = `${year}-${month}-${day}`
     return todayFormatted
}