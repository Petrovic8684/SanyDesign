-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "orderNo" SERIAL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);
