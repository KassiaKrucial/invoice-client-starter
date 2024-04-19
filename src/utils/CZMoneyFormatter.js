/**
 * Formats number into: "d ddd,dd Kč" (d...digit)
 * @type {Intl.NumberFormat}
 */
export const CZMoney = Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 2
});