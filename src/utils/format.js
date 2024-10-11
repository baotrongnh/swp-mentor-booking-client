export const formatDateToNormal = (dateString) => {
     const dateParts = dateString.split('-');
     const year = dateParts[0];
     const month = dateParts[1];
     const day = dateParts[2];
     console.log(dateParts);
     return `${day}/${month}/${year}`;
}