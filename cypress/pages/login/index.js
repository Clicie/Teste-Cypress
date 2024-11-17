class Login{

    preencherLogin(){

    cy.get('[data-qa="login-email"]').type("tester-qa-12346@gmail.com")
    cy.get('[data-qa="login-password"]').type("123456", { log: false })

      cy.get('[data-qa="login-button"]').click()
   }
}
 export default new Login()