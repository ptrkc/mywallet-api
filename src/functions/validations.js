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