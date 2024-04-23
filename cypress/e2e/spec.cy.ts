import "cypress-fs";

describe("Encrypt", () => {
    it("Encrypt 1 file correct", () => {
        cy.visit("/");

        const filePath = "cypress/e2e/test-files/test-file0.txt";
        cy.get("input[type=file]").selectFile(filePath);

        cy.get("button[type=submit]").click();

        cy.get("a[download]").should("not.be.disabled");
    });

    it("Encrypt max files correct", () => {
        cy.visit("/");

        cy.get("input[type=file]").selectFile(getFilesPaths(10));

        cy.get("button[type=submit]").click();
    });

    const getFilesPaths = (maxPaths: number) => {
        let filesCount = 0;
        const paths = [];

        while (paths.length != maxPaths) {
            const filePath = `cypress/e2e/test-files/test-file${filesCount}.txt`;
            paths.push(filePath);

            filesCount++;
        }

        return paths;
    };

    it("Encrypt exceeds the files limit", () => {
        cy.visit("/");

        const blob = new Blob(["\0".repeat(501 * 1024)], {
            type: "application/octet-stream",
        });

        const file = new File([blob], "exceeds-the-limit.txt", {
            type: "application/octet-stream",
            lastModified: Date.now(),
        });

        cy.get("input[type=file]").trigger("change", {
            force: true,
            dataTransfer: { files: [file] },
        });

        cy.get("button[type=submit]").should("be.disabled");
    });
});
