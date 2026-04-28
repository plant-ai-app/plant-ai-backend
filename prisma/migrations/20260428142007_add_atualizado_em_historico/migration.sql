/*
  Warnings:

  - Added the required column `atualizado_em` to the `HistoricoCuidado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `historicocuidado` ADD COLUMN `atualizado_em` DATETIME(3) NOT NULL;
