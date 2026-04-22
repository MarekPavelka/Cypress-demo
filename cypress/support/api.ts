const API_KEY_HEADER = 'x-api-key';

export const httpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type HttpMethod = (typeof httpMethod)[keyof typeof httpMethod];

export function request(httpMethod: HttpMethod, url: string, apiKey?: string, body?: Cypress.RequestBody) {
  const requestHeaders: Cypress.RequestOptions['headers'] = {};
  const wasApiKeyProvided = apiKey && apiKey.trim() !== '';
  if (wasApiKeyProvided) {
    requestHeaders[API_KEY_HEADER] = apiKey;
  }

  return cy.request({
    method: httpMethod,
    url,
    headers: requestHeaders,
    body,
  });
}

export function requestLabel(method: HttpMethod, url: string): string {
  return `${method} ${url}`;
}
