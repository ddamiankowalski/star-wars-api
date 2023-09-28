describe('WelcomeScreen', () => {
  beforeEach(() => cy.visit('/new-game'));

  it('can successfully go back to main screen', () => {
    cy.get('.swapi-new-game__main-actions').contains('Quit').click();
    cy.location('pathname').should('eq', '/');
  });

  it('initially the toggle button has #useStarships text', () => {
    cy.get('.swapi-new-game__main-actions').contains('Use Starships');
  });

  it('clicking toggle character button will switch between the character types', () => {
    cy.get('.swapi-new-game__main-actions').contains('Use Starships').click();
    cy.get('.swapi-new-game__main-actions').contains('Use People');

    cy.get('.swapi-new-game__main-actions').contains('Use People').click();
    cy.get('.swapi-new-game__main-actions').contains('Use Starships');
  });

  it('two cards should be visible', () => {
    cy.get('.swapi-player-card').should('have.length', 2).and('be.visible');
  });

  it('one card should be PLAYER while the other should be ENEMY', () => {
    cy.get('.swapi-player-card').contains('PLAYER');
    cy.get('.swapi-player-card').contains('ENEMY');
  });

  it('clicking on next round shows loader', () => {
    cy.get('swapi-game-loader').should('be.visible');
  });
});
