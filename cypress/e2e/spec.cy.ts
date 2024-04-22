import "cypress-fs";

describe("Encrypt", () => {
    it("Encrypt 1 file correct", () => {
        cy.visit("/");

        const filePath = "cypress/e2e/test-files/test-file0.txt";
        cy.get("input[type=file]").selectFile(filePath);

        cy.get("button[type=submit]").click();

        cy.get("a[download]").click();
    });

    it("Encrypt max files correct", () => {
        cy.visit("/");

        const filesPaths = () => {
            let filesCount = 0;
            const paths = [];
            const maxFiles = 10;

            while (paths.length != maxFiles) {
                const filePath = `cypress/e2e/test-files/test-file${filesCount}.txt`;
                paths.push(filePath);

                filesCount++;
            }

            return paths;
        };

        cy.get("input[type=file]").selectFile(filesPaths());

        cy.get("button[type=submit]").click();
    });
});
