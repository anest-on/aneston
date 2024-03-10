-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "pacient_name" TEXT NOT NULL,
    "pacient_birthdate" TEXT NOT NULL,
    "pacient_gender" TEXT NOT NULL,
    "pacient_email" TEXT NOT NULL,
    "pacient_number" TEXT NOT NULL,
    "pacient_healthInsurance" TEXT NOT NULL,
    "pacient_healthInsuranceName" TEXT,
    "pacient_healthInsuranceId" TEXT,
    "companion_name" TEXT NOT NULL,
    "companion_kinship" TEXT NOT NULL,
    "companion_email" TEXT NOT NULL,
    "companion_number" TEXT NOT NULL,
    "cirurgy_name" TEXT,
    "cirurgy_physician" TEXT,
    "pacient_weight" TEXT,
    "pacient_height" TEXT,
    "pacient_allergy" TEXT,
    "pacient_allergy_names" TEXT[],
    "pacient_heart_conditions" TEXT[],
    "pacient_heart_conditions_observation" TEXT,
    "pacient_disease" TEXT,
    "pacient_disease_names" TEXT[],
    "pacient_medicines" JSONB[],
    "pacient_antibiotic" TEXT,
    "pacient_antibiotics_names" TEXT[],
    "pacient_did_cirurgy" TEXT,
    "pacient_cirurgies" JSONB[],
    "pacient_smoke" TEXT,
    "pacient_started_smoking" TEXT,
    "pacient_stopped_smoking" TEXT,
    "pacient_when_stop_smoking" TEXT,
    "pacient_pack_smoke" TEXT,
    "pacient_do_physical_activity" TEXT,
    "pacient_physical_activity" JSONB[],
    "pacient_has_anesthetic_complication" TEXT,
    "pacient_anesthetic_complications" TEXT[],
    "pacient_procedure_summary" TEXT,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_link" TEXT,
    "city" TEXT,
    "state" TEXT,
    "avatar_url" TEXT,
    "access_type" TEXT,
    "password" TEXT,
    "confirm_password" TEXT,
    "doctor_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_time_intervals" (
    "id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    "time_start_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    "appointment_time" INTEGER NOT NULL,
    "interval_times" JSONB,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_time_intervals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Form_doctor_id_idx" ON "Form"("doctor_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "user_time_intervals_user_id_idx" ON "user_time_intervals"("user_id");

-- CreateIndex
CREATE INDEX "Account_user_id_idx" ON "Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
