/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
enum COUNTRY {
  UK = 'United Kingdom',
  US = 'United States',
  Canada = 'Canada',
  India = 'India',
  Australia = 'Australia',
  UAE = 'United Arab Emirates',
}

/**
 * Function to get a random Country from the enum
 * @returns random enum entry
 */
const randomCountry = (): string => {
  const enumLength = Object.keys(COUNTRY).length / 2 - 1;
  const randomNum = Math.floor(Math.random() * enumLength) + 0;
  return Object.values(COUNTRY)[randomNum];
};
