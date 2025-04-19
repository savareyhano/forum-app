/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // verify elements that should be visible on the login page
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // click login button without filling in email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify that the email input is invalid, focused, and visible
    cy.get('input[placeholder="Email"]:invalid')
      .should('have.focus')
      .and('be.visible');

    // verify that the URL remains on the login page
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should display alert when password is empty', () => {
    // fill in email
    cy.get('input[placeholder="Email"]').type('eee@email.com');

    // click login button without filling in password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify that the password input is invalid, focused, and visible
    cy.get('input[placeholder="Password"]:invalid')
      .should('have.focus')
      .and('be.visible');

    // verify that the URL remains on the login page
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should display alert when email and password are wrong', () => {
    // Intercept login POST request and respond with 401 error
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong'
      },
    }).as('loginFailure');

    // Listen for window.alert and assert the message
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });

    // fill in email
    cy.get('input[placeholder="Email"]').type('eee@email.com');

    // fill in wrong password
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // press the Login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Wait for the intercepted request
    cy.wait('@loginFailure');

    // verify that the URL remains on the login page
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should display homepage when email and password are correct', () => {
    // fill in email
    cy.get('input[placeholder="Email"]').type('eee@email.com');

    // fill in password
    cy.get('input[placeholder="Password"]').type('eeeeee');

    // press the Login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify that elements on the homepage are displayed
    cy.get('nav')
      .contains(/^Threads$/)
      .should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});