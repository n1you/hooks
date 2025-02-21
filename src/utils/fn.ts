const DEFAULT_FORMAT = 'XXXXX-XXXXX-XXXX-XXXX';
/**
 *
 * @param format XXXXX-XXXXX-XXXX-XXXX
 * @returns XXXXX-XXXXX-XXXX-XXXX
 *
 */
export const generateUUID = (format = DEFAULT_FORMAT) =>
    Array(format.length)
        .fill('')
        .reduce((o, _, i) => {
            let s = '-';
            if (format[i] !== '-') {
                s = parseInt(Math.random() * 35 + '').toString(36);
            }
            return o + s;
        }, '');
