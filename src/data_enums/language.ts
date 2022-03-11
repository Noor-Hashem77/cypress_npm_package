/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
enum LANGUAGE {
  English = 'English',
  Marathi = 'Marathi',
  Hindi = 'Hindi',
  Tamil = 'Tamil',
  Telugu = 'Telugu',
  Gurmukhi = 'Gurmukhi',
}
/**
 * Function to get a random language from the enum
 * @returns random enum entry
 */
const RandomLanguage = (): string => {
  const enumLength = Object.keys(LANGUAGE).length / 2 - 1;
  const randomNum = Math.floor(Math.random() * enumLength) + 0;
  return Object.values(LANGUAGE)[randomNum];
};

export default RandomLanguage;