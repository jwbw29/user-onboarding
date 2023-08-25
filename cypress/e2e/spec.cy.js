describe("Form App", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000");
  });

  // [X] HELPERS ///////
  const firstInput = () => cy.get("input[name=first_name]");
  const lastInput = () => cy.get("input[name=last_name]");
  const email = () => cy.get("input[name=email]");
  const password = () => cy.get("input[name=password]");
  const consent = () => cy.get("input[name=consent]");
  const createBtn = () => cy.get("button[id='createBtn']");
  const fnameErr = () => cy.get("#fname-error");
  const lnameErr = () => cy.get("#lname-error");
  const emailErr = () => cy.get("#email-error");
  const passwordErr = () => cy.get("#password-error");
  const consentErr = () => cy.get("#consent-error");

  it("sanity check", () => {
    expect(1 + 2).to.equal(3);
  });

  // [X] PROPER ELEMENTS ARE SHOWING /////////
  it("proper elements are showing", () => {
    firstInput().should("exist");
    lastInput().should("exist");
    email().should("exist");
    password().should("exist");
    consent().should("exist");
    createBtn().should("exist");
  });

  // [x] FILLING OUT INPUTS /////////
  describe("filling out inputs", () => {
    it("create button starts out disabled", () => {
      createBtn().should("be.disabled");
    });
    it("can type in the inputs", () => {
      firstInput()
        .should("have.value", "")
        .type("Justin")
        .should("have.value", "Justin");
      lastInput()
        .should("have.value", "")
        .type("Byrd")
        .should("have.value", "Byrd");
      email()
        .should("have.value", "")
        .type("justinbyrd7@gmail.com")
        .should("have.value", "justinbyrd7@gmail.com");
      password()
        .should("have.value", "")
        .type("asdADD@#$234")
        .should("have.value", "asdADD@#$234");
      consent().should("not.be.checked").check().should("be.checked");
    });
  });

  // [x] Error Handling ///////
  describe("Error Handling", () => {
    it("First name error handling", () => {
      // - error should not exist
      // - type
      // - clear
      // - error should exist
      fnameErr().should("not.be.visible");
      firstInput().type("Justin").clear();
      fnameErr()
        .should("be.visible")
        .and("have.text", "First name is required");
    });
    it("Last name error handling", () => {
      lnameErr().should("not.be.visible");
      lastInput().type("Byrd").clear();
      lnameErr().should("be.visible").and("have.text", "Last name is required");
    });
    it("Email error handling", () => {
      emailErr().should("not.be.visible");
      email().type("jbg");
      emailErr().should("be.visible").and("have.text", "Invalid email");
      email().clear();
      emailErr()
        .should("be.visible")
        .and("have.text", "Valid email address is required");
    });
    it("Password error handling", () => {
      passwordErr().should("not.be.visible");
      password().type("j").clear();
      passwordErr()
        .should("be.visible")
        .and(
          "have.text",
          "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol."
        );
    });
    it("Consent error handling", () => {
      consentErr().should("not.be.visible");
      consent().check().uncheck();
      consentErr()
        .should("be.visible")
        .and("have.text", "You must agree to the Terms & Service Conditions");
    });
  });

  // [x] SUBMITTING THE FORM DATA //////
  describe("Submitting the form data", () => {
    it("Create Account button is enabled and clears form when submitted", () => {
      firstInput().type("Justin");
      lastInput().type("Byrd");
      email().type("justinbyrd7@gmail.com");
      password().type("asdASD234@#$");
      consent().check();
      fnameErr().should("not.be.visible");
      lnameErr().should("not.be.visible");
      emailErr().should("not.be.visible");
      passwordErr().should("not.be.visible");
      consentErr().should("not.be.visible");
      createBtn().should("not.be.disabled");
      createBtn().click();
      firstInput().should("have.value", "");
      lastInput().should("have.value", "");
      email().should("have.value", "");
      password().should("have.value", "");
      consent().should("not.be.checked");
    });

    // [ ] WHEN NEW USER IS ADDED, DOES THEIR NAME AND EMAIL DISPLAY IN THE USERS SECTION? ////////
    // it('New user name and email displays at top of list', () =>{
    //   // ! might need to add an ID to the div
    //   // ! OR use some sort of nth-of-child
    //   // ! AND combine fname and lname to just the h2 header
    //   .contains('Justin')
    //   .contains('Byrd')
    //   .contains('justinbyrd7@gmail.com')
    // })
  });
});
