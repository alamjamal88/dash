// has number
export const hasNumber = (number: string) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
export const hasMixed = (str: string) => new RegExp(/[a-z]/).test(str) && new RegExp(/[A-Z]/).test(str);

// has special chars
export const hasSpecial = (char: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(char);
