// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
    cy.visit('http://localhost:3001');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('Create New Blog').click();
  cy.get('#title').type(title);
  cy.get('#author').type(author);
  cy.get('#url').type(url);
  cy.contains('Submit Post').click();
});
