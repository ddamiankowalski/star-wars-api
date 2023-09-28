describe('WelcomeScreen', () => {
  beforeEach(() => cy.visit('/'));

  it('welcome screen successfully initializes', () => {
    cy.get('.swapi-welcome__img-wrapper').should('be.visible');
    cy.get('.swapi-welcome-actions__message').contains(
      'Are you ready for war? May the force be with you!'
    );
    cy.get('.swapi-welcome-actions__buttons')
      .get('button')
      .contains('New Game');

    cy.get('.swapi-welcome-actions__buttons')
      .get('button')
      .contains('See my Github');
  });

  it('clicking on new game will redirect to a new path', () => {
    cy.get('.swapi-welcome-actions__buttons')
      .get('button')
      .contains('New Game')
      .click();
    cy.location('pathname').should('eq', '/new-game');
  });
});
