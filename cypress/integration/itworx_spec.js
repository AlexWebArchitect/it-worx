// ***********************************************
// All of these tests are written to implement
// the official TodoMVC tests written for Selenium.
//
// The Cypress tests cover the exact same functionality,
// and match the same test names as TodoMVC.
//
// Most tests are heavily commented because this example
// app should serve as an introduction to Cypress. Once
// you become familiar with the API these comments are
// completely unnecessary.
//
// You can find the original TodoMVC tests here:
// https://github.com/tastejs/todomvc/blob/master/tests/test.js
// ***********************************************

describe("TodoMVC - React", function(){

  // setup these constants to match what TodoMVC does
  var TODO_ITEM_ONE   = "buy some cheese"
  var TODO_ITEM_TWO   = "feed the cat"
  var TODO_ITEM_THREE = "book a doctors appointment"

  beforeEach(function(){
    // By default Cypress will automatically
    // clear the Local Storage prior to each
    // test which ensures no todos carry over
    // between tests.
    //
    // Go out and visit our local web server
    // before each test, which serves us the
    // TodoMVC App we want to test against
    //
    // We've set our baseUrl to be http://localhost:8888
    // which is automatically prepended to cy.visit
    //
    // https://on.cypress.io/api/visit
    cy.visit("/")
  })

  context("When page is initially opened", function(){
    it("should focus on the todo input field", function(){
      // get the currently focused element and assert
      // that it has class="new-todo"
      //
      // https://on.cypress.io/api/focused
     cy.focused().should("have.attr", "data-cy", "todo input")
        // cy.get('[type="text"]').to.have.attr('data-cy', 'todo input')
    })
  })
})