/// <reference types="cypress" />
// pom-page object model

import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu from '../pages/menu'
import { faker } from '@faker-js/faker'



 describe (" Automaton Exercise", () => {
    beforeEach(() => {
    cy.visit('https://automationexercise.com');

    });

  it.only("Test Case1:Cadastrar um usuário", () => {
     menu.IrParaLoginCadastro()
    cadastro.preencherFormulario()
    cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
    
    
    //Remover cadastro
    //cy.get(".shop-menu > .nav > :nth-child(5) > a").click()
    //cy.get('[data-qa="account-deleted"]').should("be.visible")
  });

  it("Test Case2:Login do usuário com e-mail e senha corretos", () => {
    menu.IrParaLoginCadastro()
    login.preencherLogin('tester-qa-12346@gmail.com',"123456")
    cy.get("i.fa-user").parent().should("contain", "Tester QA")


    //Remover cadastro
    //cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
    //cy.get('[data-qa="account-deleted"]').should('be.visible')
  });

  it("Teste Case3:Login de usuário com e-mail e senha incorretos", () => {

    menu.IrParaLoginCadastro()

   login.preencherLogin('tester-qa-0@gmail.com',"100")
   
    cy.get("p").should("contain", "Your email or password is incorrect!")
  });


  it("TeSte Case4:Sair do usuário", () => {
    menu.IrParaLoginCadastro()

    login.preencherLogin('tester-qa-12346@gmail.com','123456')

    cy.get("i.fa-user").parent().should("contain", "Tester QA");
    cy.contains("Logout").click();
    cy.url().should("contain", "login");
    cy.contains("Login to your account").should("be.visible");
  });

  it("Teste Case 5: Registrar usuário com e-mail existente", () => {
   menu.IrParaLoginCadastro()

    
    cy.get('[data-qa="signup-name"]').type(`Tester QA`);
    cy.get('[data-qa="signup-email"]').type(`tester-1721346302730@mail.com`);
    cy.contains("button", "Signup").click();

    cy.get(`.signup-form form p`)
      .should("be.visible")
      .and("contain", "Email Address already exist!");
  });
  it("Teste Case 6:Formulário de contato", () => {
   
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
   
    //cy.contains(`Products`).click()
    menu.IrParaProdutos()

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
      menu.IrParaProdutos()
     
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
        

        cy.get('input#susbscribe_email')
          .scrollIntoView()
          .type('tester-qa@mail.com')// Fiz com este e-mail pois com o meu não estava funcionando
         cy.get('button#subscribe').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
       });

        it('Test Case 15: Place Order: Register before Checkout', () => {
            cadastro.preencherFormulario()
        
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

