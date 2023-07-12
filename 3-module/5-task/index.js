function getMinMax(str) {
  return str
    .split(' ')
    .filter(value => isFinite(value))
    .map(value => parseFloat(value))
    .reduce((number, item) => {
        if (item > number.max) {
          number.max = item;
        }
        if (item < number.min) {
          number.min = item;
        }
        return number;
      },
      { min: Infinity, max: -Infinity }
    );
}
