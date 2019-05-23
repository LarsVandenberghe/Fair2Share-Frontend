describe('Mock login', function () {
    it('Checking if friend-requests are being diplayed', function () {
  
        cy.server();

        cy.route({
            method: 'GET',
            url: 'http://localhost:4200/api/Profile/',
            status: 200,
            response: 'fixture:profile.json'
        });

        cy.route({
            method: 'POST',
            url: 'http://localhost:4200/api/Account',
            status: 201,
            response: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsYXJzQGhvZ2VudC5iZSIsInVuaXF1ZV9uYW1lIjoibGFyc0Bob2dlbnQuYmUiLCJleHAiOjE1NTg2MjYzNDV9.khoZ0a14_aOwbitC2PLlKGrIAKLwYoE-9r6aTDHKkfE"'
        });

        cy.route({
            method: 'GET',
            url: 'http://localhost:4200/api/Profile/image/*',
            status: 204,
            response: ''
        });

        cy.visit('http://localhost:4200/home');

        cy.get('[formControlName=username]').type('somerandom@email.address');
        cy.get('[type=submit]').click();
  
        cy.wait(100);
        cy.get('[cy-data=friendRequests]').should('exist');
        cy.get('[cy-data=friendRequests]').should('contain.text', ' 80 ');
    });

    it('Checking if friend-requests are not being diplayed', function () {
  
        cy.server();

        cy.route({
            method: 'GET',
            url: 'http://localhost:4200/api/Profile/',
            status: 200,
            response: 'fixture:profile2.json'
        });

        cy.route({
            method: 'POST',
            url: 'http://localhost:4200/api/Account',
            status: 201,
            response: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsYXJzQGhvZ2VudC5iZSIsInVuaXF1ZV9uYW1lIjoibGFyc0Bob2dlbnQuYmUiLCJleHAiOjE1NTg2MjYzNDV9.khoZ0a14_aOwbitC2PLlKGrIAKLwYoE-9r6aTDHKkfE"'
        });

        cy.route({
            method: 'GET',
            url: 'http://localhost:4200/api/Profile/image/*',
            status: 204,
            response: ''
        });

        cy.visit('http://localhost:4200/home');

        cy.get('[formControlName=username]').type('somerandom@email.address');
        cy.get('[type=submit]').click();
  
        cy.wait(100);
        cy.get('[cy-data=friendRequests]').should('not.exist');
    });
  
  })