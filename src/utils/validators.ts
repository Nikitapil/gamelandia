export const inputValidators = {
  required: (value: string) => {
    if (!value) {
      return 'field_required';
    }
    return '';
  },

  email: (value: string) => {
    if (
      !value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return 'incorrect_email';
    }
    return '';
  },

  password: (value: string) => {
    if (value.length < 8) {
      return 'password_error';
    }
    return '';
  }
};

export type TValidators = typeof inputValidators;
export type TValidationRules = keyof TValidators;
