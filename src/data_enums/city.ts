/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
enum CITY {
  Delhi = 'New Delhi',
  NYC = 'New York',
  London = 'London',
  Dubai = 'Dubai',
  Mumbai = 'Mumbai',
  Lahore = 'Lahore',
  Pune = 'Pune',
  Colombo = 'Colombo',
}

/**
 * Function to get a random City from the enum
 * @returns random enum entry
 */
const RandomCity = (): string => {
  const enumLength = Object.keys(CITY).length / 2 - 1;
  const randomNum = Math.floor(Math.random() * enumLength) + 0;
  return Object.values(CITY)[randomNum];
};

export default RandomCity;