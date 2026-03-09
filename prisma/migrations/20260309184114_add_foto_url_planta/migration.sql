/*
  Warnings:

  - Made the column `criado_em` on table `planta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `atualizado_em` on table `planta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `planta` ADD COLUMN `data_aquisicao` DATETIME(0) NULL,
    ADD COLUMN `foto_url` VARCHAR(255) NULL,
    MODIFY `nome_cientifico` VARCHAR(100) NULL,
    MODIFY `apelido` VARCHAR(100) NULL,
    MODIFY `criado_em` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `atualizado_em` DATETIME(3) NOT NULL;
