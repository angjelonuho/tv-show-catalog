// cypress/integration/tvshowlist.spec.js


describe('TVShowList', () => {
    it('should navigate to TVShowCard when clicked', () => {
        cy.visit('/')
        cy.get('.tv-show-li').first().click()
        cy.get('.tv-show-details').should('be.visible')
    })

    it('should search and navigate to a TVShowCard after searching', () => {
        cy.visit('/')
        cy.get('.tv-show-input').first().click()
        cy.get('.tv-show-input').type('Breaking Bad')
        cy.get('.tv-show-search-ul').should('be.visible')
        cy.get('.tv-show-search-li').first().click()
        cy.get('.tv-show-template').should('be.visible')
    })

})
