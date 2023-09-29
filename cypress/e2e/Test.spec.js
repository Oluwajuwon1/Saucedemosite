
/// <reference types= "cypress"/>

describe ('saucedemo Testing', ()=> {
  
 beforeEach('login application', ()=> {
    cy.loginApplication()
 });


 const NavigateToverify = () => {
  cy.get('.inventory_container').find('.inventory_item').then ((listItem) => {
    cy.wrap(listItem).eq(0).find('.inventory_item_label').should('contain', 'Sauce Labs Backpack');
    cy.wrap(listItem).should('have.length', '6');
    cy.wrap(listItem).eq(3).find('.inventory_item_description').children('.pricebar').should('contain','$49.99');
    cy.wrap(listItem).eq(0).find('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.wrap(listItem).eq(0).find('[data-test="remove-sauce-labs-backpack"]').should('contain','Remove');
    cy.wrap(listItem).eq(1).find('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.wrap(listItem).eq(2).find('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    
   })
 }

 it('verify App logo on login page', ()=> {
   cy.get('.login_logo').should('be.visible')
 })

 it('verify login', ()=> {
   cy.get('.form_group').find('[placeholder="Username"]').type('standard_user');
   cy.get('.form_group').find('[placeholder="Password"]').type('secret_sauce');
   cy.get('[data-test="login-button"]').click();
    cy.location('pathname').should('eq','/inventory.html')
 })

 it('verify error message with invalid login details', ()=> {
   cy.get('.form_group').find('[placeholder="Username"]').type('standad_user');
   cy.get('.form_group').find('[placeholder="Password"]').type('secret_auce');
   cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user in this service')
 })

 it('verify homepage content',()=> {
   cy.SignIn();
    NavigateToverify();
 })

 it('verify unauthorized user in cart session', ()=> {
   cy.SignIn();
   cy.get('.shopping_cart_link').click()
   cy.location('pathname').should('contain', '/')
 })

 it('verify cart content', ()=> {
   cy.SignIn();
  NavigateToverify();
   cy.get('.shopping_cart_link').click();
   cy.location('pathname').should('contain','/cart.html' )
   cy.get('.cart_desc_label').should('be.visible')
   cy.get('.cart_item').should('have.length', '3')
   cy.get('[data-test="checkout"]').click();
 })

 it('verify checkout button and page', ()=> {
   cy.SignIn();
   NavigateToverify();
     cy.get('.shopping_cart_link').click();
     cy.get('[data-test="checkout"]').click();
     cy.location('pathname').should('contain', '/checkout-step-one.html');
     cy.get('.header_secondary_container').find('.title').should('be.visible').and('contain', 'Checkout: Your Information')
 })


 it('verify checkout firstname,lastname and postcode', () => {
   cy.SignIn();
   NavigateToverify();
     cy.get('.shopping_cart_link').click();
     cy.get('[data-test="checkout"]').click();
     cy.location('pathname').should('contain','/checkout-step-one.html')
      cy.get('.checkout_info').find('.form_group').then((formgroup) => {
      cy.wrap(formgroup).find('[data-test="firstName"]').type('Juskie');
      cy.wrap(formgroup).find('[data-test="lastName"]').type('Ben');
      cy.wrap(formgroup).find('[data-test="postalCode"]').type('53662');
      cy.get('[data-test="continue"]').click();
   })
 })

 it('verify checkout confirmation details and succes page', ()=> {
   cy.SignIn();
   NavigateToverify();
     cy.get('.shopping_cart_link').click();
     cy.get('[data-test="checkout"]').click();
     cy.get('.checkout_info').find('.form_group').then((formgroup) => {
      cy.wrap(formgroup).find('[data-test="firstName"]').type('Juskie');
      cy.wrap(formgroup).find('[data-test="lastName"]').type('Ben');
      cy.wrap(formgroup).find('[data-test="postalCode"]').type('53662');
      cy.get('[data-test="continue"]').click();
   })
   cy.get('.header_secondary_container').find('.title').should('be.visible').and('contain','Checkout: Overview')
   cy.get('.summary_info').should('be.visible');
   cy.location('pathname').should('contain','/checkout-step-two.html')
   cy.get('[data-test="finish"]').click();
   cy.location('pathname').should('contain', '/checkout-complete.html')
   cy.get('.complete-header').should('be.visible').and('contain','Thank you for your order!')
 })

})