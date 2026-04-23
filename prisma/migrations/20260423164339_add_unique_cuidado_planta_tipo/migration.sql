/*
  Warnings:

  - You are about to alter the column `quantidade_instrucao` on the `cuidado` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(80)`.
  - A unique constraint covering the columns `[planta_id,tipo_id]` on the table `Cuidado` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cuidado` MODIFY `quantidade_instrucao` VARCHAR(80) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cuidado_planta_id_tipo_id_key` ON `Cuidado`(`planta_id`, `tipo_id`);
