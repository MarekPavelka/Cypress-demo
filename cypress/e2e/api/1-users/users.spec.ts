/// <reference types="cypress" />

import { API_ENDPOINTS } from '../../../support/api/endpoints';
import { expectSchema } from '../../../support/api/schema';
import * as httpClient from '../../../support/api/httpClient';
import * as usersSchemas from './users.schemas';

const USERS_FIXTURE = 'api-users.json';
const MAX_RESPONSE_TIME_MS = 300;
const FIRST_USER_ID = '1';
let testUsers: { name: string; job: string }[] = [];

describe('ReqRes API test suite', () => {
  const apiUrl = Cypress.expose('reqresApiUrl');
  let apiKey = '';

  before(() => {
    cy.env(['reqresApiKey']).then((credentials) => {
      apiKey = (credentials.reqresApiKey as string) ?? '';
    });

    cy.fixture(USERS_FIXTURE).then((users: Array<{ name: string; job: string }>) => {
      testUsers = users;
    });
  });

  describe('Get users', { tags: ['@api', '@smoke'] }, () => {
    it('API-GET-001: should return users with valid structure and total number', () => {
      const usersUrl = `${apiUrl}${API_ENDPOINTS.users}`;

      httpClient.request(httpClient.method.GET, usersUrl, apiKey).then((response) => {
        expect(response.status).to.eq(200);
        const resBody = expectSchema(usersSchemas.getUsersResponseSchema, response.body, httpClient.requestLabel(httpClient.method.GET, usersUrl));

        expect(resBody.data[0].last_name).not.be.empty;
        expect(resBody.data[1].last_name).not.be.empty;
        expect(resBody.data.length).to.eq(resBody.per_page);
      });
    });

    it('API-GET-002: should fetch users from all pages and validate all users count', () => {
      const allUsers: usersSchemas.ReqresUser[] = [];
      const usersUrl = `${apiUrl}${API_ENDPOINTS.users}`;
      let totalUsers = 0;
      let totalPages = 0;
      let usersPerPage = 0;

      httpClient.request(httpClient.method.GET, usersUrl, apiKey).then((response) => {
        expect(response.status).to.eq(200);
        const firstResBody = expectSchema(usersSchemas.getUsersResponseSchema, response.body, httpClient.requestLabel(httpClient.method.GET, usersUrl));

        usersPerPage = firstResBody.per_page;
        totalUsers = firstResBody.total;
        totalPages = firstResBody.total_pages;
        allUsers.push(...firstResBody.data);

        for (let page = 2; page <= totalPages; page++) {
          const usersPageUrl = `${apiUrl}${API_ENDPOINTS.users}?page=${page}`;

          httpClient.request(httpClient.method.GET, usersPageUrl, apiKey).then((pageResponse) => {
            expect(pageResponse.status).to.eq(200);
            const resBody = expectSchema(usersSchemas.getUsersResponseSchema, pageResponse.body, httpClient.requestLabel(httpClient.method.GET, usersPageUrl));

            expect(resBody.data.length).to.be.at.most(usersPerPage);
            allUsers.push(...resBody.data);
          });
        }
      });

      // final assertions after all requests completed
      cy.then(() => {
        expect(totalPages).to.be.greaterThan(0);
        expect(totalUsers).to.be.greaterThan(0);
        expect(allUsers.length).to.eq(totalUsers);

        const userIds = allUsers.map((user) => user.id);
        const uniqueUserIds = new Set(userIds);
        expect(uniqueUserIds.size).to.eq(allUsers.length); // verify no duplicate user IDs
      });
    });
  });

  describe('Create new user', { tags: ['@api', '@smoke'] }, () => {
    it('API-POST-001: should create user from fixture and validate response status code and body', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}`;
      const userPayload = testUsers[0];
      httpClient.request(httpClient.method.POST, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(201);
        const body = expectSchema(usersSchemas.createUserResponseSchema, response.body, httpClient.requestLabel(httpClient.method.POST, url));

        expect(body.name).to.eq(userPayload.name);
        expect(body.job).to.eq(userPayload.job);
      });
    });
  });

  describe('Update existing user', { tags: ['@api', '@smoke'] }, () => {
    it('API-PUT-001: should update existing user and validate response status code and body', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;
      const userPayload = testUsers[0];

      httpClient.request(httpClient.method.PUT, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(200);
        const body = expectSchema(usersSchemas.updateUserResponseSchema, response.body, httpClient.requestLabel(httpClient.method.PUT, url));

        expect(body.name).to.eq(userPayload.name);
        expect(body.job).to.eq(userPayload.job);
      });
    });
  });

  describe('Delete existing user', { tags: ['@api', '@smoke'] }, () => {
    it('API-DELETE-001: should delete user, validate response status code and empty body', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;

      httpClient.request(httpClient.method.DELETE, url, apiKey).then((response) => {
        expect(response.status).to.eq(204);
        expect(response.body).to.be.oneOf([undefined, null, '']);
      });
    });
  });

  describe('Performance', { tags: ['@api', '@perf'] }, () => {
    it('API-PERF-POST-001: should create user response under 1000ms', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}`;
      const userPayload = testUsers[0];

      httpClient.request(httpClient.method.POST, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.duration).to.be.lessThan(MAX_RESPONSE_TIME_MS);
      });
    });

    it('API-PERF-PUT-001: should update user response under 1000ms', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;
      const userPayload = testUsers[0];

      httpClient.request(httpClient.method.PUT, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(MAX_RESPONSE_TIME_MS);
      });
    });

    it('API-PERF-DEL-001: should delete user response under 1000ms', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;

      httpClient.request(httpClient.method.DELETE, url, apiKey).then((response) => {
        expect(response.status).to.eq(204);
        expect(response.duration).to.be.lessThan(MAX_RESPONSE_TIME_MS);
      });
    });
  });
});
