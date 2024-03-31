-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "longUrl" TEXT NOT NULL,
    "shortUrlHash" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_longUrl_key" ON "Url"("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrlHash_key" ON "Url"("shortUrlHash");
