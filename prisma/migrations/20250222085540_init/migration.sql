-- CreateTable
CREATE TABLE "Apprenant" (
    "id_apprenant" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "sexe" TEXT NOT NULL,
    "nom_et_prenom_tuteur" TEXT NOT NULL,
    "tel_tuteur" TEXT NOT NULL,
    "email_tuteur" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Enseignant" (
    "id_enseignant" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Administrateur" (
    "id_administrateur" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Presence" (
    "id_presence" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_jour" DATETIME NOT NULL,
    "heure_arrivé" DATETIME NOT NULL,
    "heure_depart" DATETIME,
    "statut_presence" TEXT,
    "id_apprenant" INTEGER NOT NULL,
    CONSTRAINT "Presence_id_apprenant_fkey" FOREIGN KEY ("id_apprenant") REFERENCES "Apprenant" ("id_apprenant") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Apprenant_email_tuteur_key" ON "Apprenant"("email_tuteur");

-- CreateIndex
CREATE UNIQUE INDEX "Administrateur_email_key" ON "Administrateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrateur_password_key" ON "Administrateur"("password");
