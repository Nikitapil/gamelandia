export const inputValidators = {
  required: (value: string) => {
    if (!value) {
      return 'Field is required';
    }
    return '';
  },

  email: (value: string) => {
    if (
      !value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return 'Email is incorrect';
    }
    return '';
  },

  password: (value: string) => {
    if (value.length < 8) {
      return 'Invalid password: minimum length: 8';
    }
    return '';
  }
};

export type TValidators = typeof inputValidators;
export type TValidationRules = keyof TValidators;
