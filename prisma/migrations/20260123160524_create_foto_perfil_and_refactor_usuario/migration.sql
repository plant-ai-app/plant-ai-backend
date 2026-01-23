-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `senha_hash` VARCHAR(255) NOT NULL,
    `fk_foto_perfil` INTEGER NOT NULL,
    `status` ENUM('ativo', 'inativo') NULL DEFAULT 'ativo',
    `criado_em` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `atualizado_em` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `encerrado_em` DATETIME(0) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foto_perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_fk_foto_perfil_fkey` FOREIGN KEY (`fk_foto_perfil`) REFERENCES `foto_perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
