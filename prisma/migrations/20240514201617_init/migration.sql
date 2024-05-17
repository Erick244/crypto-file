-- CreateTable
CREATE TABLE "EncrypredFile" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,

    CONSTRAINT "EncrypredFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EncrypredFile_fileName_key" ON "EncrypredFile"("fileName");
