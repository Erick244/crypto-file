import { readFileSync } from "fs";
import path from "path";

describe("decrypt tests", () => {
    it("decrypt file", async () => {
        // Arrange
        const formData = createTestFormDataWithFile();

        // Act
        const { resp, data } = await decryptFile(formData);

        // Assert
        expect(resp.status).toBe(200);
        expect(data.downloadLink).not.toBeNull();
    });

    function createTestFormDataWithFile() {
        const formData = new FormData();

        const testFile = readFileSync(
            path.join(__dirname, "file-test.txt_crypto-file")
        );
        const fileBlob = new Blob([testFile]);

        formData.append("file", fileBlob);

        return formData;
    }

    async function decryptFile(formData: FormData) {
        const resp = await fetch("http://localhost:3000/api/decrypt", {
            method: "POST",
            body: formData,
        });

        const data = await resp.json();

        return {
            resp,
            data,
        };
    }

    it("check decrypted file", async () => {
        // Arrange
        const formData = createTestFormDataWithFile();
        const { resp, data } = await decryptFile(formData);

        // Act
        const testFileContent = readFileSync(
            path.join(__dirname, "file-test.txt_crypto-file"),
            "utf-8"
        );
        const basePath = path.resolve(__dirname, "../../../../../"); // TODO: Change
        const decryptedFilePath = `${basePath}/public/${data.downloadLink}`;
        const decryptedFileContent = readFileSync(decryptedFilePath, "utf8");

        // Assert
        expect(resp.status).toBe(200);
        expect(decryptedFileContent).not.toBeNull();
        expect(decryptedFileContent).not.toEqual(testFileContent);
        expect(decryptedFileContent).toEqual("Hello World");
    });
});
