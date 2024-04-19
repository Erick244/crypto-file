import { readFileSync } from "fs";
import path from "path";

describe("encrypt tests", () => {
    it("encrypt file", async () => {
        // Arrange
        const formData = createTestFormDataWithFile();

        // Act
        const { resp, data } = await encryptFile(formData);

        // Assert
        expect(resp.status).toBe(200);
        expect(data.downloadLink).not.toBeNull();
    });

    function createTestFormDataWithFile() {
        const formData = new FormData();

        const testFile = readFileSync(path.join(__dirname, "file-test.txt"));
        const fileBlob = new Blob([testFile], { type: "text/plain" });

        formData.append("file", fileBlob);

        return formData;
    }

    async function encryptFile(formData: FormData) {
        const resp = await fetch("http://localhost:3000/api/encrypt", {
            method: "POST",
            body: formData,
        });

        const data = await resp.json();

        return {
            resp,
            data,
        };
    }

    it("check encrypted file", async () => {
        // Arrange
        const formData = createTestFormDataWithFile();
        const { resp, data } = await encryptFile(formData);

        // Act
        const testFileContent = readFileSync(
            path.join(__dirname, "file-test.txt"),
            "utf-8"
        );
        const basePath = path.resolve(__dirname, "../../../../../"); // TODO: Change
        const encryptedFilePath = `${basePath}/public/${data.downloadLink}`;
        const encryptedFileContent = readFileSync(encryptedFilePath, "utf8");

        // Assert
        expect(resp.status).toBe(200);
        expect(encryptedFileContent).not.toBeNull();
        expect(encryptedFileContent).not.toEqual(testFileContent);
    });
});
