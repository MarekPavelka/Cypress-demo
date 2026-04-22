/// <reference types="cypress" />

import { API_ENDPOINTS } from '../../../support/routes';
import { expectSchema } from '../../../support/schema';
import * as api from '../../../support/api';
import * as usersSchemas from './users.schemas';

const USERS_FIXTURE = 'api-users.json';
const MAX_RESPONSE_TIME_MS = 100;
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

  describe('Get users', () => {
    it('API-GET-001: should return users with valid structure and total number', () => {
      const usersUrl = `${apiUrl}${API_ENDPOINTS.users}`;

      api.request(api.httpMethod.GET, usersUrl, apiKey).then((response) => {
        expect(response.status).to.eq(200);
        const resBody = expectSchema(usersSchemas.getUsersResponseSchema, response.body, api.requestLabel(api.httpMethod.GET, usersUrl));

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

      api.request(api.httpMethod.GET, usersUrl, apiKey).then((response) => {
        expect(response.status).to.eq(200);
        const firstResBody = expectSchema(usersSchemas.getUsersResponseSchema, response.body, api.requestLabel(api.httpMethod.GET, usersUrl));

        usersPerPage = firstResBody.per_page;
        totalUsers = firstResBody.total;
        totalPages = firstResBody.total_pages;
        allUsers.push(...firstResBody.data);

        for (let page = 2; page <= totalPages; page++) {
          const usersPageUrl = `${apiUrl}${API_ENDPOINTS.users}?page=${page}`;

          api.request(api.httpMethod.GET, usersPageUrl, apiKey).then((pageResponse) => {
            expect(pageResponse.status).to.eq(200);
            const resBody = expectSchema(usersSchemas.getUsersResponseSchema, pageResponse.body, api.requestLabel(api.httpMethod.GET, usersPageUrl));

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

  describe('Create new user', () => {
    it('API-POST-001: should create user from fixture and validate response status code and body', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}`;
      const userPayload = testUsers[0];
      api.request(api.httpMethod.POST, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(201);
        const body = expectSchema(usersSchemas.createUserResponseSchema, response.body, api.requestLabel(api.httpMethod.POST, url));

        expect(body.name).to.eq(userPayload.name);
        expect(body.job).to.eq(userPayload.job);
      });
    });
  });

  describe('Update existing user', () => {
    it('API-PUT-001: should update existing user and validate response status code and body', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;
      const userPayload = testUsers[0];

      api.request(api.httpMethod.PUT, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(200);
        const body = expectSchema(usersSchemas.updateUserResponseSchema, response.body, api.requestLabel(api.httpMethod.PUT, url));

        expect(body.name).to.eq(userPayload.name);
        expect(body.job).to.eq(userPayload.job);
      });
    });
  });

  describe('Delete existing user', () => {
    it('API-DELETE-001: should delete user, validate response status code and empty body', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;

      api.request(api.httpMethod.DELETE, url, apiKey).then((response) => {
        expect(response.status).to.eq(204);
        expect(response.body).to.be.oneOf([undefined, null, '']);
      });
    });
  });

  describe('Performance', () => {
    it('API-PERF-POST-001: should create user response under 1000ms', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}`;
      const userPayload = testUsers[0];

      api.request(api.httpMethod.POST, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.duration).to.be.lessThan(MAX_RESPONSE_TIME_MS);
      });
    });

    it('API-PERF-PUT-001: should update user response under 1000ms', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;
      const userPayload = testUsers[0];

      api.request(api.httpMethod.PUT, url, apiKey, userPayload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(MAX_RESPONSE_TIME_MS);
      });
    });

    it('API-PERF-DEL-001: should delete user response under 1000ms', () => {
      const url = `${apiUrl}${API_ENDPOINTS.users}${FIRST_USER_ID}`;

      api.request(api.httpMethod.DELETE, url, apiKey).then((response) => {
        expect(response.status).to.eq(204);
        expect(response.duration).to.be.lessThan(MAX_RESPONSE_TIME_MS);
      });
    });
  });
});
