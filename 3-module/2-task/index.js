function filterRange(arr, a, b) {
  let result = arr.filter((value) => {
    return value >= a && value <= b;
  });
  return result;
}
