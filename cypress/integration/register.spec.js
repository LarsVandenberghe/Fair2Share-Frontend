describe('Register Test', function () {
  it('Register existing email', function () {

    cy.visit('http://localhost:4200/register');

    cy.get('[formControlName=email]').type('lars@hogent.be');

    cy.get('[formControlName=password]').click();

    cy.wait(100);

    cy.get('[cy-data=email]').should('contain.text', ' User already exists ');

  });


  it('passwords do not match', function () {

    cy.visit('http://localhost:4200/register');

    cy.get('[formControlName=password]').type('testTest123');

    cy.get('[formControlName=confirmPassword]').type('testTest12');

    cy.get('[formControlName=email]').click();

    cy.wait(100);

    cy.get('[cy-data=matchPasswords]').should('contain.text', ' Passwords are not the same ');
  });

})
