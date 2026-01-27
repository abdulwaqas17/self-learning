import { ApiError } from "../utils/ApiError.js";

export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    console.log('==============login schema======================');
    console.log(schema);
    console.log('==============login schema======================');
    const joiRes = schema.validate(req[property]);
    console.log('==============joiRes======================');
    console.log(joiRes);
    console.log('==============joiRes======================');
    const { error } = joiRes;

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    next();
  };
};
