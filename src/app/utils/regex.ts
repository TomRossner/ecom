// Regular Expressions patterns

// Email pattern
export const EMAIL_REGEX: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

// Names pattern.
// Includes a-z and A-Z.
// Includes min 3 and max 30 letters. 
export const NAME_REGEX: RegExp = /([a-zA-Z]{3,30}\s*)+/

// Phone number pattern.
// Includes digits 0-9 and symbols like + - ( ).
export const PHONE_NUMBER_REGEX: RegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
// export const PHONE_NUMBER_REGEX: RegExp = /^\d{10}$/

export const CARD_NUMBER_REGEX: RegExp = /^\d{16}$/

export const SECURITY_CODE_REGEX: RegExp = /^\d{3}$/

export const ID_REGEX: RegExp = /^\d{9}$/