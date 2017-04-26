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

    it("should render todo input field", function(){
        cy.get("input", {timeout: 10000}).should("have.attr", "type", "text")
    })  

    it("should focus on the todo input field", function(){
      // get the currently focused element and assert
      // that it has class="new-todo"
      //
      // https://on.cypress.io/api/focused
        cy.focused().should("have.attr", "data-cy", "todo input")
    })
  })
  context("New Todo", function(){
    // New commands used here:
    // - cy.type     https://on.cypress.io/api/type
    // - cy.eq       https://on.cypress.io/api/eq
    // - cy.find     https://on.cypress.io/api/find
    // - cy.contains https://on.cypress.io/api/contains
    // - cy.should   https://on.cypress.io/api/should
    // - cy.as       https://on.cypress.io/api/as

    // New concepts introduced:
    // - Aliasing    https://on.cypress.io/api/aliasing
    // - Assertions  https://on.cypress.io/api/assertions

    it("should allow me to add todo items", function(){
      cy
        // create 1st todo
        .get("[data-cy='todo input']").type(TODO_ITEM_ONE).type("{enter}")

        // make sure the 1st label contains the 1st todo text
        .get("[data-cy='todo list'] li").eq(0).find("label").should("contain", TODO_ITEM_ONE)

        // create 2nd todo
        .get("[data-cy='todo input']").type(TODO_ITEM_TWO).type("{enter}")
        .get("[data-cy='todo input']").type(TODO_ITEM_THREE).type("{enter}")

        // make sure the 2nd label contains the 2nd todo text
        .get("[data-cy='todo list'] li").eq(0).find("label").should("contain", TODO_ITEM_THREE)
    })

    it("should clear text input field when an item is added", function(){
      cy
        .get("[data-cy='todo input']")
        .type(TODO_ITEM_ONE)
        .type("{enter}")
        .should("have.value", "")
    })

    it("should trim text input", function(){
      cy
        // this is an example of another custom command
        // since we repeat the todo creation over and over
        // again. It's up to you to decide when to abstract
        // repetitive behavior and roll that up into a custom
        // command vs explicitly writing the code.
        .createTodo("    " + TODO_ITEM_ONE + "    ")

        // we use as explicit assertion here about the text instead of
        // using 'contain' so we can specify the exact text of the element
        // does not have any whitespace around it
        .get("[data-cy='todo list'] li").eq(0).should("have.text", TODO_ITEM_ONE)
    })

    it("should append new items to the top of the list", function(){
      cy
        // this is an example of a custom command
        // which is stored in cypress/support/commands.js
        // you should open up the commands and look at
        // the comments!
        .createDefaultTodos().as("todos")

        // even though the text content is split across
        // multiple <span> and <strong> elements
        // `cy.contains` can verify this correctly
        .get("[data-cy='todo count']").contains("3 items left")

        .get("@todos").eq(2).find("label").should("contain", TODO_ITEM_ONE)
        .get("@todos").eq(1).find("label").should("contain", TODO_ITEM_TWO)
        .get("@todos").eq(0).find("label").should("contain", TODO_ITEM_THREE)
    })
  })

})