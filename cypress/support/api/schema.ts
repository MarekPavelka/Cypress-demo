import type { z } from 'zod';

/**
 * Validates any payload against a Zod schema and returns strongly typed data.
 * @param schema Zod schema used as runtime contract for the payload shape.
 * @param payload Raw response data (untrusted until validated).
 * @param caller Identifies the caller in assertion output on validation failure.
 * @returns Parsed payload with type inferred from the provided schema.
 */
export function expectSchema<TSchema extends z.ZodTypeAny>(schema: TSchema, payload: unknown, caller: string): z.infer<TSchema> {
  const parsedResult = schema.safeParse(payload);
  if (!parsedResult.success) {
    const errorHeader = 'API response did not match expected contract.';
    const error = JSON.stringify(parsedResult.error.issues, null, 2);
    throw new Error(`${errorHeader}\n${caller}\n${error}`);
  }

  return parsedResult.data;
}
