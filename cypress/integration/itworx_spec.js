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
        .get("[data-cy='todo input']").as("todoInput").type(TODO_ITEM_ONE).type("{enter}")

        // make sure the 1st label contains the 1st todo text
        .get("[data-cy='todo list'] li").as("todoListItems").eq(0).find("label").should("contain", TODO_ITEM_ONE)

        // create 2nd todo
        .get("@todoInput").type(TODO_ITEM_TWO).type("{enter}")
        .get("@todoInput").type(TODO_ITEM_THREE).type("{enter}")

        // make sure the 2nd label contains the 2nd todo text
        .get("[data-cy='todo list'] li").eq(2).find("label").should("contain", TODO_ITEM_ONE)
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

   context("Mark all as completed", function(){
    // New commands used here:
    // - cy.check    https://on.cypress.io/api/check
    // - cy.uncheck  https://on.cypress.io/api/uncheck

    beforeEach(function(){
      // This is an example of aliasing
      // within a hook (beforeEach).
      // Aliases will automatically persist
      // between hooks and are available
      // in your tests below
      cy.createDefaultTodos().as("todos")
    })

    it("should allow me to mark all items as completed", function(){
      cy
        // complete all todos
        // we use 'check' instead of 'click'
        // because that indicates our intention much clearer
       .get("[data-cy='todo toggle all']").check()

        // get each todo li and ensure its have css 'line-through'
        .get("@todos").eq(0).find("label").should("have.css", "text-decoration", "line-through solid rgb(217, 217, 217)")
        .get("@todos").eq(1).find("label").should("have.css", "text-decoration", "line-through solid rgb(217, 217, 217)")
        .get("@todos").eq(2).find("label").should("have.css", "text-decoration", "line-through solid rgb(217, 217, 217)")
        // .get("@todos").eq(0).find("label").should("have.css", "text-decoration", "line-through*")
        // .get("@todos").eq(1).find("label").should("have.css", "text-decoration", "line-through*")
        // .get("@todos").eq(2).find("label").should("have.css", "text-decoration", "line-through*")
    })
   })

   context("Editing", function(){
    // New commands used here:
    // - cy.blur    https://on.cypress.io/api/blur

    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should hide other controls when editing", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo").find("[data-cy='todo toggle']").should("not.be.visible")
        .get("@secondTodo").find("label").should("not.be.visible")

    })

    it("should save edits on blur", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find("input[type=text]").clear()
          .type("buy some sausages")

          // we can just send the blur event directly
          // to the input instead of having to click
          // on another button on the page. though you
          // could do that its just more mental work
          .blur()

        .get("@todos").eq(0).should("contain", TODO_ITEM_THREE)
        .get("@secondTodo").should("contain", "buy some sausages")
        .get("@todos").eq(2).should("contain", TODO_ITEM_ONE)
    })

    it("should trim entered text", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find("input[type=text]").clear()
          .type("    buy some sausages    ").type("{enter}")

        .get("@todos").eq(0).should("contain", TODO_ITEM_THREE)
        .get("@secondTodo").should("contain", "buy some sausages")
        .get("@todos").eq(2).should("contain", TODO_ITEM_ONE)
    })

    it("should remove the item if an empty text string was entered", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find("input[type=text]").clear().type("{enter}")

        .get("@todos").should("have.length", 2)
    })

    it("should cancel edits on escape", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find("input[type=text]").clear().type("foo{esc}")

        .get("@todos").eq(2).should("contain", TODO_ITEM_ONE)
        .get("@todos").eq(1).should("contain", TODO_ITEM_TWO)
        .get("@todos").eq(0).should("contain", TODO_ITEM_THREE)
    })
  })

  context("Counter", function(){
    it("should display the current number of todo items", function(){
      cy
        .createTodo(TODO_ITEM_ONE)
        .get("[data-cy='todo count'").contains("1 item left")
        .createTodo(TODO_ITEM_TWO)
        .get("[data-cy='todo count'").contains("2 items left")
    })
  })
  
   context("Clear completed button", function(){
    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should display the correct text", function(){
      cy
        .get("@todos").eq(0).find("[data-cy='todo toggle']").check()
        .get("[data-cy='todo clear completed']").contains("Clear completed")
    })

    it("should remove completed items when clicked", function(){
      cy
        .get("@todos").eq(1).find("[data-cy='todo toggle']").check()
        .get("[data-cy='todo clear completed']").click()
        .get("@todos").should("have.length", 2)
        .get("@todos").eq(0).should("contain", TODO_ITEM_THREE)
        .get("@todos").eq(1).should("contain", TODO_ITEM_ONE)
    })

    it("should be hidden when there are no items that are completed", function(){
      cy
        .get("@todos").eq(1).find("[data-cy='todo toggle']").check()
        .get("[data-cy='todo clear completed']").should("be.visible").click()
        .get("[data-cy='todo clear completed']").should("not.exist")
    })
  })

   context("Routing", function(){
    // New commands used here:
    // - cy.window  https://on.cypress.io/api/window
    // - cy.its     https://on.cypress.io/api/its
    // - cy.invoke  https://on.cypress.io/api/invoke
    // - cy.within  https://on.cypress.io/api/within

    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should allow me to display active items", function(){
      cy
        .get("@todos").eq(1).find("[data-cy='todo toggle']").check()
        .get("[data-cy='todo filters']").contains("Active").click()
        .get("@todos").eq(0).should("contain", TODO_ITEM_THREE)
        .get("@todos").eq(1).should("contain", TODO_ITEM_ONE)
    })

    it("should allow me to display completed items", function(){
      cy
        .get("@todos").eq(1).find("[data-cy='todo toggle']").check()
        .get("[data-cy='todo filters']").contains("Completed").click()
        .get("@todos").should("have.length", 1)
    })

    it("should allow me to display all items", function(){
      cy
        .get("@todos").eq(1).find("[data-cy='todo toggle']").check()
        .get("[data-cy='todo filters']").as("filters").contains("Active").click()
        .get("@filters").contains("Completed").click()
        .get("@filters").contains("All").click()
        .get("@todos").should("have.length", 3)
    })
  })
})
