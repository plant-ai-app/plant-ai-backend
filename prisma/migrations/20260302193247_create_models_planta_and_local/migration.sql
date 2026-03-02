/*
  Warnings:

  - You are about to drop the `foto_perfil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `usuario_fk_foto_perfil_fkey`;

-- DropIndex
DROP INDEX `usuario_fk_foto_perfil_fkey` ON `usuario`;

-- DropTable
DROP TABLE `foto_perfil`;

-- CreateTable
CREATE TABLE `FotoPerfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Planta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_usuario_id` INTEGER NOT NULL,
    `fk_local_id` INTEGER NULL,
    `nome_popular` VARCHAR(100) NOT NULL,
    `nome_cientifico` VARCHAR(100) NOT NULL,
    `apelido` VARCHAR(100) NOT NULL,
    `observacao` VARCHAR(255) NULL,
    `criado_em` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `atualizado_em` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Local` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_fk_foto_perfil_fkey` FOREIGN KEY (`fk_foto_perfil`) REFERENCES `FotoPerfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Planta` ADD CONSTRAINT `Planta_fk_local_id_fkey` FOREIGN KEY (`fk_local_id`) REFERENCES `Local`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Planta` ADD CONSTRAINT `Planta_fk_usuario_id_fkey` FOREIGN KEY (`fk_usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
