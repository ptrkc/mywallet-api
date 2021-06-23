import joi from "joi";

const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function signInValidation(object) {
    const schema = joi.object({
        email: joi.string().trim().pattern(emailRegEx).required(),
        password: joi.string().required(),
    });
    const error = schema.validate(object).error;
    return error
        ? false
        : {
              email: object.email.trim(),
              password: object.password,
          };
}

export function signUpValidation(object) {
    const schema = joi.object({
        name: joi.string().trim().required(),
        email: joi.string().trim().pattern(emailRegEx).required(),
        password: joi.string().required(),
    });
    const error = schema.validate(object).error;
    return error
        ? false
        : {
              name: object.name.trim(),
              email: object.email.trim(),
              password: object.password,
          };
}

export function newTransactionValidation(object) {
    const schema = joi.object({
        description: joi.string().trim().required(),
        value: joi.number().integer().min(1).required(),
        type: joi
            .string()
            .pattern(/^(expense|income)$/)
            .required(),
    });
    const error = schema.validate(object).error;
    return error
        ? false
        : {
              description: object.description.trim(),
              value: object.value,
              type: object.type,
          };
}
