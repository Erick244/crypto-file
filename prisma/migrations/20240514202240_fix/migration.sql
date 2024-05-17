/*
  Warnings:

  - You are about to drop the `EncrypredFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EncrypredFile";

-- CreateTable
CREATE TABLE "EncryptedFile" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,

    CONSTRAINT "EncryptedFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EncryptedFile_fileName_key" ON "EncryptedFile"("fileName");
