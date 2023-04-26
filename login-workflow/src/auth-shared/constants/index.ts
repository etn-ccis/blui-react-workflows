export const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const USERNAME_REGEX = /^[^\r\n\t\f\v ]+$/;

/////////////////////////////////////////////////////////////////////////////////////
// NOTE: The following Regular expressions are used for the
//       password validation logic. It is critical that they not
//       be "global" regexes  (no 'g' after the last slash). Global
//       regexes maintain state when their .test() function is called.
//       We don't want that.
export const SPECIAL_CHAR_REGEX = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/;
export const LENGTH_REGEX = /^.{8,16}$/;
export const NUMBERS_REGEX = /[0-9]+/;
export const UPPER_CASE_REGEX = /[A-Z]+/;
export const LOWER_CASE_REGEX = /[a-z]+/;
/////////////////////////////////////////////////////////////////////////////////////
