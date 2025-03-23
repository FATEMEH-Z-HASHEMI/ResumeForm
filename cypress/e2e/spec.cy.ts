describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})
describe('Show From', () => {
  it('Show From', () => {
    cy.visit('http://localhost:3000/');
    
    cy.get('[data-testid = "form"]').should("be.visible")
  })
})
describe('Form Submission', () => {
  it('Checks inputs to see if they are working properly.', () => {

    cy.visit('http://localhost:3000/');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="phoneNumber"]').type('1234567890');

  });
});