const Joi = require('joi');

//TODO: Might want to consider adding a function here to validate the JWT tokens coming in are in the correct form

function validateUserEntry(requestBody) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required().min(2).max(12),
    email: Joi.string().email().required(),
    birthDate: Joi.string().required(),
    password: Joi.string().required().min(4).max(12),
  });

    return schema.validate(requestBody);
}

function validateUserLogin(requestBody) {
    const schema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(requestBody);
}

function validateLeaderboardEntry(requestBody) {
  const schema = Joi.object({
    userId: Joi.string().alphanum().required(),
    finalScore: Joi.number().min(0).required(),
    category: Joi.string().alphanum().required(),
    timeStamp: Joi.date().required()
  });

    return schema.validate(requestBody);
}

module.exports = {
    validateUserEntry, validateLeaderboardEntry,
    validateUserLogin
}
