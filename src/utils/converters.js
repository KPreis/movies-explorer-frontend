export const convertDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const result = hours > 0 ?
    `${hours}ч ${min}мин` :
    `${min}минут`;

  return result;
}