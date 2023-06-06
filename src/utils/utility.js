import { format } from 'date-fns';

export const isNumeric = (str) => {
    const numericPattern = /^\d+$/;
    return numericPattern.test(str);
};

export const formatDate = (date) => {
    return format(new Date(date), 'dd LLL yyyy hh:mm a');
};