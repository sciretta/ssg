/// <reference types="cypress" />

describe("Rick & Morty ssg example", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Landing page can be opened", () => {
    cy.contains("Rick and Morty");
  });

  it("Load more button works", () => {
    cy.contains("load more").click();
  });
});

describe("Character page", () => {
  it("Rick page", () => {
    cy.visit("http://localhost:3000/character/1");
    cy.contains("Rick Sanchez");
  });

  it("Morty page", () => {
    cy.visit("http://localhost:3000/character/2");
    cy.contains("Morty Smith");
  });

  it("Summer page", () => {
    cy.visit("http://localhost:3000/character/3");
    cy.contains("Summer Smith");
  });
});
