// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e


// media query
const customMediaQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`;

export const media = {
  custom: customMediaQuery,
  sm: customMediaQuery(550),
  md: customMediaQuery(920),
};
