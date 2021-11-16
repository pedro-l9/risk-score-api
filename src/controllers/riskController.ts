import { Request, Response } from 'express';

import { ClientInformation } from '../model';
import { getClientRiskProfile } from '../services/riskScoreService';
import { getRiskProfileSchema } from './schemas';

export async function getRiskProfile(req: Request, res: Response) {
  const clientInformation: ClientInformation =
    await getRiskProfileSchema.validateAsync(req.body, {
      abortEarly: false,
    });

  const clientRiskProfile = getClientRiskProfile(clientInformation);

  res.json(clientRiskProfile);
}
