import Select from "../../src/components/Select";

describe("Select.cy.js", () => {
  it("playground", () => {
    cy.mount(
      <Select
        options={[
          {
            label: "Item 1",
            value: 1,
          },
          {
            label: "Item 2",
            value: 2,
          },
        ]}
        id="a"
        selectedValue="2"
      />
    );

    cy.get(".selectContainer").should("contains.text", "Item 1");
  });
});
