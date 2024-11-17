class Cadastro{
    preencherFormulario(){
        const timestamp = new Date().getTime();

        cy.visit('https://automationexercise.com')

        cy.contains('SignUnup').click()

        const signUpName = "Tester QA";

        Cypress.env('signUpName',signUpName)

        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName',signUpName))
        cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`)
        cy.contains("button", "Signup").click()

        cy.get("input[type=radio]").check("Mrs")
        cy.get("input[type=radio]").eq(1).check() // 0, 1, 2
        cy.get("[type=password]").type("12345", { log: false })
        cy.get('[data-qa="days"]').select("18");
        cy.get('[data-qa="months"]').select("May")
        cy.get('[data-qa="years"]').select("1990");
        cy.get("input[type=checkbox]#newsletter").check()
        cy.get("input[type=checkbox]#optin").check()
        cy.get('[data-qa="first_name"]').type("Rebeca")
        cy.get('[data-qa="last_name"]').type("Andrade")
        cy.get('[data-qa="company"]').type("Tabajara")
        cy.get('[data-qa="address"]').type("rua treze, n 13")
        cy.get('[data-qa="country"]').select("United States")
        cy.get('[data-qa="state"]').type("Califórnia")
        cy.get('[data-qa="city"]').type("Los Angeles")
        cy.get('[data-qa="zipcode"]').type("90001")
        cy.get('[data-qa="mobile_number"]').type("111 222 333")
        cy.get('[data-qa="create-account"]').click()
        cy.url().should("includes", "account_created")
        cy.get('[data-qa="account-created"]').should("be.visible")
        cy.get('[data-qa="continue-button"]').click()
    }

}
      export default new Cadastro ()