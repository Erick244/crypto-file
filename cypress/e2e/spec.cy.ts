import "cypress-fs";

describe("Encrypt", () => {
    it("Encrypt 1 file correct", () => {
        cy.visit("/");

        const filePath = "cypress/e2e/test-files/to-encrypt/test-file.txt";
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
        const paths = [];

        while (paths.length != maxPaths) {
            const filePath = `cypress/e2e/test-files/to-encrypt/test-file.txt`;
            paths.push(filePath);
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

describe("Decrypt", () => {
    it("Decrypt 1 file correct", () => {
        cy.visit("/decrypt");

        const filePath =
            "cypress/e2e/test-files/to-decrypt/test-file.txt.123_crypto-file";
        cy.get("input[type=file]").selectFile(filePath);

        cy.get("button[type=submit]").click();

        cy.get("a[download]").should("not.be.disabled");
    });

    it("Decrypt max files correct", () => {
        cy.visit("/decrypt");

        cy.get("input[type=file]").selectFile(getFilesPaths(10));

        cy.get("button[type=submit]").click();
    });

    const getFilesPaths = (maxPaths: number) => {
        const paths = [];

        while (paths.length != maxPaths) {
            const filePath = `cypress/e2e/test-files/to-decrypt/test-file.txt.123_crypto-file`;
            paths.push(filePath);
        }

        return paths;
    };

    it("Decrypt exceeds the files limit", () => {
        cy.visit("/decrypt");

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
