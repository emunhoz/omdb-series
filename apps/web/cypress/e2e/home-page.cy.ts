describe('[Page]: Home', () => {
  it('render home page with season details', () => {
    const activeEpisodeTitle = 'Joan Is Awful'
    const episode = '1'

    cy.visit('http://localhost:3000/')
    cy.get('small').contains('Season 6').should('be.visible')
    cy.get('h1').contains('Black Mirror').should('be.visible')
    cy.get('p')
      .contains(
        "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide."
      )
      .should('be.visible')

    cy.get(`[alt="Episode ${episode}"]`).should(
      'have.class',
      'EpisodeCard_episodeImageActive__r91sY'
    )

    cy.get('h2').contains(activeEpisodeTitle).should('be.visible')

    cy.get('div')
      .contains(`Episode ${episode} - 15 Jun 2023`)
      .should('be.visible')
    cy.get('h3').contains(activeEpisodeTitle).should('be.visible')
    cy.get('[alt="Tail left"]').closest('button').should('be.disabled')
    cy.get('[alt="Tail right"]').closest('button').should('be.enabled')
  })

  it('click on the `TailRight` button should render next episode', () => {
    const activeEpisodeTitle = 'Loch Henry'
    const episode = '2'

    cy.visit('http://localhost:3000/')

    cy.get(`li[id="episode-${episode}"]`).click()

    cy.get(`[alt="Episode ${episode}"]`).should(
      'have.class',
      'EpisodeCard_episodeImageActive__r91sY'
    )

    cy.get('h2').contains(activeEpisodeTitle).should('be.visible')

    cy.get('div')
      .contains(`Episode ${episode} - 15 Jun 2023`)
      .should('be.visible')
    cy.get('h3').contains(activeEpisodeTitle).should('be.visible')

    cy.get('[alt="Tail left"]').closest('button').should('be.enabled')
    cy.get('[alt="Tail right"]').closest('button').should('be.enabled')
  })

  it('go to last episode should disable `TailRight', () => {
    const activeEpisodeTitle = 'Demon 79'
    const episode = '5'

    cy.visit('http://localhost:3000/')

    cy.get(`li[id="episode-${episode}"]`).click()

    cy.get(`[alt="Episode ${episode}"]`).should(
      'have.class',
      'EpisodeCard_episodeImageActive__r91sY'
    )

    cy.get('h2').contains(activeEpisodeTitle).should('be.visible')

    cy.get('div')
      .contains(`Episode ${episode} - 15 Jun 2023`)
      .should('be.visible')
    cy.get('h3').contains(activeEpisodeTitle).should('be.visible')

    cy.get('[alt="Tail left"]').closest('button').should('be.enabled')
    cy.get('[alt="Tail right"]').closest('button').should('be.disabled')
  })
})
