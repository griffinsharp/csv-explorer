export const snakeCaseToCapitalized = (snakeString) => (
  snakeString.split('_').map(subStr => subStr[0].toUpperCase() + subStr.slice(1)).join(' ')
);