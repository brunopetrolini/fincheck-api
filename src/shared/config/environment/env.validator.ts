import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { Environment } from './environment';

export function validateEnv(config: Record<string, any>) {
  const validated = plainToInstance(Environment, config, { enableImplicitConversion: true });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    const errorMsgs = errors.map((e) => Object.values(e.constraints || {}).join(', ')).join('; ');
    throw new Error(`Invalid environment configuration: ${errorMsgs}`);
  }
  return validated;
}
