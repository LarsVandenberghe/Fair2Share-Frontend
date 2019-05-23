describe('Login Test', function () {
  it('Login with wrong passord', function () {

    cy.visit('http://localhost:4200/home');

    cy.get('[formControlName=username]').type('lars@hogent.be');

    cy.get('[formControlName=password]').type('testTest123');

    cy.wait(10);

    cy.get('[type=submit]').click();

    cy.wait(100);

    cy.get('[data-cy=loginErrorMsg]').should('have.text', 'Email address and or password is wrong');

  });

  it('Login with correct and loggin out', function () {

    cy.visit('http://localhost:4200/home');

    cy.get('[formControlName=username]').type('lars@hogent.be');

    cy.get('[formControlName=password]').type('testPassword1');

    cy.wait(10);

    cy.get('[type=submit]').click();

    cy.wait(100);

    cy.url().should('eq', 'http://localhost:4200/profile');

    cy.get('[cy-data=logout]').click();

    cy.wait(100);
    cy.url().should('eq', 'http://localhost:4200/home');

  });

})