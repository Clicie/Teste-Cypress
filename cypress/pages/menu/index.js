class Menu{
    IrParaProdutos(){
     cy.contains(`Products`).click()

     } 
    

   IrParaLoginCadastro(){
      cy.contains("Signup").click();

   }


 }
   export default new Menu()