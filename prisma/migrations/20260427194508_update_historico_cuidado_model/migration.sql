/*
  Warnings:

  - You are about to drop the column `atualizado_em` on the `historicocuidado` table. All the data in the column will be lost.
  - The values [ATRASADO,CANCELADO] on the enum `HistoricoCuidado_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[cuidado_id,data_prevista]` on the table `HistoricoCuidado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_prevista` to the `HistoricoCuidado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `historicocuidado` DROP COLUMN `atualizado_em`,
    ADD COLUMN `data_prevista` DATETIME(3)  NULL,
    MODIFY `status` ENUM('CONCLUIDO', 'PULADO') NOT NULL;

-- CreateIndex
CREATE INDEX `HistoricoCuidado_data_prevista_idx` ON `historicocuidado`(`data_prevista`);

-- CreateIndex
CREATE UNIQUE INDEX `HistoricoCuidado_cuidado_id_data_prevista_key` ON `historicocuidado`(`cuidado_id`, `data_prevista`);

-- RenameIndex
-- ALTER TABLE `historicocuidado` RENAME INDEX `HistoricoCuidado_cuidado_id_fkey` TO `HistoricoCuidado_cuidado_id_idx`;
