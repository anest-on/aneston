-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "pacient_birthdate" DROP NOT NULL,
ALTER COLUMN "pacient_gender" DROP NOT NULL,
ALTER COLUMN "pacient_email" DROP NOT NULL,
ALTER COLUMN "pacient_number" DROP NOT NULL,
ALTER COLUMN "pacient_healthInsurance" DROP NOT NULL,
ALTER COLUMN "companion_name" DROP NOT NULL,
ALTER COLUMN "companion_kinship" DROP NOT NULL,
ALTER COLUMN "companion_email" DROP NOT NULL,
ALTER COLUMN "companion_number" DROP NOT NULL;
