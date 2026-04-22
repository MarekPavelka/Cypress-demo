/// <reference types="cypress" />

import { pom } from '../../../support/ui/pageManager';
import { UI_ROUTES } from '../../../support/ui/routes';
import { InventorySortOption } from '../../../pages/home.page';

describe('Product sorting test suite', { tags: '@ui' }, () => {
  const homePage = pom.getHomePage();

  beforeEach(() => {
    cy.uiLogin();
  });

  describe('Sorting availability and default value', () => {
    it('SRT-001: should show the product sort control', () => {
      homePage.getProductSortSelect().should('be.visible').and('be.enabled');
    });

    it('SRT-002: should sort products by default by name ascending', () => {
      const sortByNameAscOptionTxt = 'Name (A to Z)';

      homePage.getProductSortSelect().should('have.value', InventorySortOption.AtoZ);
      homePage.getProductSortSelect().find('option:selected').should('have.text', sortByNameAscOptionTxt);
    });
  });

  describe('Individual sorting functionality', () => {
    it('SRT-003: should sort products by name ascending', () => {
      homePage.selectSort(InventorySortOption.AtoZ);
      homePage.expectProductNamesSortedAscending();
    });

    it('SRT-004: should sort products by name descending', () => {
      homePage.selectSort(InventorySortOption.ZtoA);
      homePage.expectProductNamesSortedDescending();
    });

    it('SRT-005: should sort products by price ascending', () => {
      homePage.selectSort(InventorySortOption.LowToHigh);
      homePage.expectProductPricesSortedAscending();
    });

    it('SRT-006: should sort products by price descending', () => {
      homePage.selectSort(InventorySortOption.HighToLow);
      homePage.expectProductPricesSortedDescending();
    });
  });

  describe('Sequential sorting functionality', () => {
    it('SRT-007: should update product order correctly on each sort change', () => {
      homePage.selectSort(InventorySortOption.AtoZ);
      homePage.expectProductNamesSortedAscending();

      homePage.selectSort(InventorySortOption.ZtoA);
      homePage.expectProductNamesSortedDescending();

      homePage.selectSort(InventorySortOption.LowToHigh);
      homePage.expectProductPricesSortedAscending();

      homePage.selectSort(InventorySortOption.HighToLow);
      homePage.expectProductPricesSortedDescending();

      homePage.selectSort(InventorySortOption.AtoZ);
      homePage.expectProductNamesSortedAscending();
    });
  });

  describe('Sorting reset', () => {
    it('SRT-008: should reset the selected sorting to default after refresh', () => {
      homePage.selectSort(InventorySortOption.HighToLow);
      homePage.expectProductPricesSortedDescending();
      cy.reload();
      cy.url().should('include', UI_ROUTES.inventory);
      homePage.expectProductNamesSortedAscending();
    });
  });
});
