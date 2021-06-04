export function getTimeStamp(date: string | any) {
  let d;
  if (typeof date === 'string') d = new Date(parseInt(date));
  else d = new Date(date);
  let s =
    leadingZeros(d.getFullYear(), 4) +
    '-' +
    leadingZeros(d.getMonth() + 1, 2) +
    '-' +
    leadingZeros(d.getDate(), 2) +
    ' ' +
    leadingZeros(d.getHours(), 2) +
    ':' +
    leadingZeros(d.getMinutes(), 2) +
    ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
}

export function leadingZeros(n: any, digits: number) {
  let zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += '0';
  }
  return zero + n;
}
