import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvValidation } from './env.validation';

export function loadAndValidateEnv() {
  const env = plainToInstance(EnvValidation, process.env, { enableImplicitConversion: true });
  const errors = validateSync(env, { skipMissingProperties: false });
  if (errors.length > 0) {
    const errorMsgs = errors.map((e) => Object.values(e.constraints || {}).join(', ')).join('; ');
    throw new Error(`Invalid environment configuration: ${errorMsgs}`);
  }
  return env;
}
