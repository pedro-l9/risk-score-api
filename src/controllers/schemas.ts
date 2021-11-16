import Joi from 'joi';

import { HouseOwnershipStatus, MaritalStatus } from '../model';

export const getRiskProfileSchema = Joi.object({
  age: Joi.number().integer().min(0).required(),
  dependents: Joi.number().integer().min(0).required(),
  house: Joi.object({
    ownership_status: Joi.valid(
      ...Object.values(HouseOwnershipStatus)
    ).required(),
  }),
  income: Joi.number().integer().min(0).required(),
  marital_status: Joi.string()
    .valid(...Object.values(MaritalStatus))
    .required(),
  risk_questions: Joi.array().items(Joi.valid(1, 0)).length(3).required(),
  vehicle: Joi.object({
    year: Joi.number().integer().positive().required(),
  }),
}).options({ stripUnknown: true });
