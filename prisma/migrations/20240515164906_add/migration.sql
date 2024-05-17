-- CreateTable
CREATE TABLE "DecryptedFile" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,

    CONSTRAINT "DecryptedFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DecryptedFile_fileName_key" ON "DecryptedFile"("fileName");
