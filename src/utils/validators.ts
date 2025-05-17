import Joi from "joi";

export const validators = {
  tokenAddress: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid token address",
      "string.empty": "Token address is required",
    }),
  tokenSymbol: Joi.string().alphanum().min(1).max(10).required().messages({
    "string.alphanum": "Token symbol must be alphanumeric",
    "string.min": "Token symbol must be at least 1 character",
    "string.max": "Token symbol must be at most 10 characters",
    "string.empty": "Token symbol is required",
  }),
};
