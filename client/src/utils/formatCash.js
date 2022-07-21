export const formatCash = (number) => {
    return (""+number).toString().split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })
}

export const formatStringtoNum = (string) => {
    return parseInt(string.replaceAll('.', '').replace('đ',''));
}