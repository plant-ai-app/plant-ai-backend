-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `senha_hash` VARCHAR(255) NOT NULL,
    `fk_foto_perfil` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('ativo', 'inativo') NULL DEFAULT 'ativo',
    `criado_em` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `atualizado_em` DATETIME(3) NULL,
    `encerrado_em` DATETIME(0) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FotoPerfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pwd_reset_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_usuario_id` INTEGER NOT NULL,
    `token_hash` VARCHAR(255) NOT NULL,
    `expira_em` DATETIME(3) NOT NULL,
    `encerrado_em` DATETIME(3) NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Planta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_usuario_id` INTEGER NOT NULL,
    `fk_local_id` INTEGER NULL,
    `nome_popular` VARCHAR(100) NOT NULL,
    `nome_cientifico` VARCHAR(100) NULL,
    `apelido` VARCHAR(100) NULL,
    `familia` VARCHAR(100) NULL,
    `foto_url` VARCHAR(255) NULL,
    `data_aquisicao` DATE NULL,
    `observacao` VARCHAR(255) NULL,
    `criado_em` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `atualizado_em` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Local` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuidadoTipo` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuidado` (
    `id` VARCHAR(191) NOT NULL,
    `frequencia_dias` INTEGER NOT NULL,
    `proxima_data` DATETIME(3) NOT NULL,
    `quantidade_instrucao` VARCHAR(80) NULL,
    `horario_preferencial` VARCHAR(191) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,
    `planta_id` INTEGER NOT NULL,
    `tipo_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cuidado_planta_id_tipo_id_key`(`planta_id`, `tipo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoricoCuidado` (
    `id` VARCHAR(191) NOT NULL,
    `data_realizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_prevista` DATETIME(3) NOT NULL,
    `observacoes` VARCHAR(191) NULL,
    `status` ENUM('CONCLUIDO', 'PULADO') NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cuidado_id` VARCHAR(191) NOT NULL,

    INDEX `HistoricoCuidado_cuidado_id_idx`(`cuidado_id`),
    INDEX `HistoricoCuidado_data_prevista_idx`(`data_prevista`),
    UNIQUE INDEX `HistoricoCuidado_cuidado_id_data_prevista_key`(`cuidado_id`, `data_prevista`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_fk_foto_perfil_fkey` FOREIGN KEY (`fk_foto_perfil`) REFERENCES `FotoPerfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pwd_reset_token` ADD CONSTRAINT `pwd_reset_token_fk_usuario_id_fkey` FOREIGN KEY (`fk_usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Planta` ADD CONSTRAINT `Planta_fk_local_id_fkey` FOREIGN KEY (`fk_local_id`) REFERENCES `Local`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Planta` ADD CONSTRAINT `Planta_fk_usuario_id_fkey` FOREIGN KEY (`fk_usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuidado` ADD CONSTRAINT `Cuidado_planta_id_fkey` FOREIGN KEY (`planta_id`) REFERENCES `Planta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuidado` ADD CONSTRAINT `Cuidado_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `CuidadoTipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoCuidado` ADD CONSTRAINT `HistoricoCuidado_cuidado_id_fkey` FOREIGN KEY (`cuidado_id`) REFERENCES `Cuidado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
