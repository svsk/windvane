import { DateTime } from 'luxon';

export const DateHelpers = {
    formatDate: (date: Date | number, format: string) => {
        const actualDate = new Date(date);
        const dt = DateTime.fromMillis(+actualDate);
        if (!dt.isValid) {
            return '';
        }

        if (format.includes("'st'")) {
            const date = dt.toLocal();
            const day = date.day;
            let ordinal;

            if ([1, 21, 31].includes(day)) {
                ordinal = "'st'";
            } else if ([2, 22].includes(day)) {
                ordinal = "'nd'";
            } else if ([3, 23].includes(day)) {
                ordinal = "'rd'";
            } else {
                ordinal = "'th'";
            }

            format = format.replace(/'st'/g, ordinal);
        }

        return dt.toFormat(format);
    },
};
