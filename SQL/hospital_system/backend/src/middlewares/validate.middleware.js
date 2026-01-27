import { ApiError } from "../utils/ApiError.js";

export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const joiRes = schema.validate(req[property]);

    const { error } = joiRes;

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    next();
  };
};
