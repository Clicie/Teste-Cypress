/// <reference types="cypress" />
import { faker } from '@faker-js/faker' 

 describe (" Automaton Exercise", () => {
  it("Test Case1:Cadastrar um usuário", () => {
    cy.visit("https://automationexercise.com");
    const timestamp = new Date().getTime();
    const signUpName = "Tester QA";
    cy.get("a[href$=login]").click();
    cy.get('[data-qa="signup-name"]').type("Tester QA");
    cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`);
    cy.contains("button", "Signup").click();
    cy.get("input[type=radio]").check("Mrs");
    cy.get("input[type=radio]").eq(1).check(); // 0, 1, 2
    cy.get("[type=password]").type("12345", { log: false });
    cy.get('[data-qa="days"]').select("18");
    cy.get('[data-qa="months"]').select("May");
    cy.get('[data-qa="years"]').select("1990");
    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();
    cy.get('[data-qa="first_name"]').type("Rebeca");
    cy.get('[data-qa="last_name"]').type("Andrade");
    cy.get('[data-qa="company"]').type("Tabajara");
    cy.get('[data-qa="address"]').type("rua treze, n 13");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("Califórnia");
    cy.get('[data-qa="city"]').type("Los Angeles");
    cy.get('[data-qa="zipcode"]').type("90001");
    cy.get('[data-qa="mobile_number"]').type("111 222 333");
    cy.get('[data-qa="create-account"]').click();
    cy.url().should("includes", "account_created");
    cy.get('[data-qa="account-created"]').should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    cy.get("ul.nav.navbar-nav").should("contain", `Logged in as ${signUpName}`);
    cy.get(".shop-menu > .nav > :nth-child(5) > a").click();
    cy.get('[data-qa="account-deleted"]').should("be.visible");
  });

  it("Test Case2:Login do usuário com e-mail e senha corretos", () => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup").click();
    cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com')
    cy.get('[data-qa="login-password"]').type('12345', { log: false })
    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain','Tester QA')
    //cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
    //cy.get('[data-qa="account-deleted"]').should('be.visible')
  });

  it("Teste Case3:Login de usuário com e-mail e senha incorretos", () => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup").click();
    cy.get('[data-qa="login-email"]').type("tester-qa-0@gmail.com");
    cy.get('[data-qa="login-password"]').type("100", { log: false });
    cy.get('[data-qa="login-button"]').click();
    cy.get("p").should("contain", "Your email or password is incorrect!");
  });

  it("TeSte Case4:Sair do usuário", () => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup").click();
    cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com')
    cy.get('[data-qa="login-password"]').type('12345', { log: false })
    cy.get('[data-qa="login-button"]').click();
    cy.get("i.fa-user").parent().should("contain", "Tester QA");
    cy.contains("Logout").click();
    cy.url().should("contain", "login");
    cy.contains("Login to your account").should("be.visible");
  });

  it("Teste Case 5: Registrar usuário com e-mail existente", () => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup").click();

    cy.get('[data-qa="signup-name"]').type(`Tester QA`);
    cy.get('[data-qa="signup-email"]').type(`tester-1721346302730@mail.com`);
    cy.contains("button", "Signup").click();

    cy.get(`.signup-form form p`)
      .should("be.visible")
      .and("contain", "Email Address already exist!");
  });
  it("Teste Case 6:Formulário de contato", () => {
    cy.visit("https://automationexercise.com");
    cy.contains(`Contact us`).click();

    cy.get(`.contact-form h2`)
      .should("be.visible")
      .and("have.text", "Get In Touch");
    cy.get('[data-qa="name"]').type(`QA`);
    cy.get('[data-qa="email"]').type(`qateate-qa@mail.com`);
    cy.get('[data-qa="subject"]').type(`Automação de teste`);
    cy.get('[data-qa="message"]').type(`Testando`);
    cy.fixture("example.json").as("arquivo");
    cy.get('input[name="upload_file"]').selectFile("@arquivo");
    cy.get('[data-qa="submit-button"]').click();
    cy.get(".status").should(
      "have.text",
      "Success! Your details have been submitted successfully.");
  });
   
  it('Teste Case 8: Verificar todos os produtos e a página de detalhes do produto', () => {
    cy.visit('https://automationexercise.com')
    cy.contains(`Products`).click()

    cy.url().should('contain', 'products')
    cy.get('.title').should('be.visible').and('contain', 'All Products')

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)
      .first()
      .parent()
      .contains('View Product')
      .click()
    cy.get('.product-information > h2').should('be.visible')
    cy.get('.product-information p').should('be.visible').and('have.length', 4)
    cy.get('.product-information span span').should('be.visible')
      });

     it('Teste Case 9:Pesquisar produto', () => {
     cy.visit("https://automationexercise.com");
     cy.contains(`Products`).click()
     cy.url().should('contain', 'products')
     cy.get('.title').should('be.visible').and('contain', 'All Products')
     cy.get('input#search_product').type('Dress')
     cy.get('button#submit_search').click()

    cy.get('.title').should('be.visible').and('contain', 'Searched Products')

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)

    
  });

    it('Teste Case 10: Verificar assinatura na página inicial ', () => {
        cy.visit('https://automationexercise.com')

        cy.get('input#susbscribe_email')
          .scrollIntoView()
          .type('tester-qa@mail.com')// Fiz com este e-mail pois com o meu não estava funcionando
         cy.get('button#subscribe').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
          
    });

        it('Test Case 15: Place Order: Register before Checkout', () => {
            const timestamp = new Date().getTime()
            const nome = "QA"
        
            cy.visit('https://automationexercise.com')
            cy.get('[href$=login]').click()
            cy.get('[data-qa="signup-name"]').type(nome)
            cy.get('[data-qa=signup-email]').type(`ironman${timestamp}@qa.com.br`)
            cy.get('[data-qa="signup-button"]').click()
            cy.get('input[type=radio]').eq(0).check();
            cy.get('[data-qa="password"]').type('5r4s15sd5f1', { log: false });
            cy.get('[data-qa=days]').select(25)
            cy.get('[data-qa="months"]').select(5)
            cy.get('[data-qa="years"]').select('1989')
            cy.get('input[type=checkbox]#newsletter').check()
            cy.get('input[type=checkbox]#optin').check()
            cy.get('[data-qa="first_name"]').type('Tony')
            cy.get('[data-qa="last_name"]').type('Stark')
            cy.get('[data-qa="company"]').type('Stark Industries')
            cy.get('[data-qa="address"]').type('XXXX')
            cy.get('[data-qa="country"]').select('United States')
            cy.get('[data-qa="state"]').type('California')
            cy.get('[data-qa="city"]').type('Los Angeles')
            cy.get('[data-qa="zipcode"]').type('8789498')
            cy.get('[data-qa="mobile_number"]').type('378 98562-8781')
            cy.get('[data-qa="create-account"]').click()
            cy.get('b')
              .should('contain', 'Account Created!')
            cy.url().should('includes', 'account_created')
            cy.get('[data-qa="account-created"]')
              .should('be.visible')
            cy.get('[data-qa="continue-button"]').click()
            cy.get('b').should('contain', nome)
            cy.contains("Add to cart").click()
            cy.contains("View Cart").click()
            cy.get('.btn-default.check_out').should('be.visible')
            cy.get('.btn-default.check_out').click()
            cy.get('.heading').first().should('have.text', 'Address Details')
            cy.get('.heading').last().should('have.text', 'Review Your Order')
            cy.get('.form-control').type('378 98562-8781')
            cy.get('.btn-default.check_out').click()
            cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
            cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
            cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
            cy.get('[data-qa="expiry-month"]').type(12)
            cy.get('[data-qa="expiry-year"]').type(2035)
            cy.get('[data-qa="pay-button"]').click()
            cy.get('[data-qa="order-placed"]').should('be.visible')
            cy.get('[href *="delete"]').click()
            cy.get('b').should('contain', 'Account Deleted!')
            cy.get('[data-qa="continue-button"]').click()
 
        
    });

  
    });

