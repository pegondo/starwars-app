describe("template spec", () => {
  const visit = () => cy.visit("http://localhost:6969/");

  it("should render the page", () => {
    visit();
  });

  it("should sort by name", () => {
    visit();

    const nameTableHead = cy
      .contains("Name")
      .get('[data-testid="table-head-label"]')
      .first();
    nameTableHead.click();

    nameTableHead.get('[data-testid="ArrowDownwardIcon"]').should("exist");
  });

  it("should sort by created field", () => {
    visit();

    const creationDateTableHead = cy
      .get('[data-testid="table-head-label"]')
      .contains("Creation date")
      .first();
    creationDateTableHead.click();

    // Verify that the sorting arrow is there.
    creationDateTableHead
      .get('[data-testid="ArrowDownwardIcon"]')
      .should("exist");
  });

  it("show elements when an existing filter is applied", () => {
    visit();

    const filterIcon = cy.get('[data-testid="FilterListIcon"]');
    filterIcon.click();

    // We assume that there will always be a person with "a" in their name.
    const filterInput = cy.get('[data-testid="filters-input"]');
    filterInput.type("a");

    const cell = cy.get('[data-testid="table-cell-name"');
    cell.should("exist");
  });

  it("show elements when a non-existing filter is applied", () => {
    visit();

    const filterIcon = cy.get('[data-testid="FilterListIcon"]');
    filterIcon.click();

    // We assume that there won't be a person with "<random-filter>" in their
    // name.
    const filterInput = cy.get('[data-testid="filters-input"]');
    filterInput.type("<random-filter>");

    const cell = cy.get('[data-testid="table-cell-name"');
    cell.should("not.exist");
  });

  it("should navigate to the next page", () => {
    visit();

    const nextPageIcon = cy.get('[data-testid="KeyboardArrowRightIcon"]');
    nextPageIcon.click();

    const cell = cy.get('[data-testid="table-cell-name"]');
    cell.should("exist");
  });

  it("should navigate to the previous page after navigating to the next page", () => {
    visit();

    const nextPageButton = cy.get('[data-testid="KeyboardArrowRightIcon"]');
    nextPageButton.click();

    const previousPageButton = cy.get('[data-testid="KeyboardArrowLeftIcon"]');
    previousPageButton.click();

    const cell = cy.get('[data-testid="table-cell-name"]');
    cell.should("exist");
  });
});
