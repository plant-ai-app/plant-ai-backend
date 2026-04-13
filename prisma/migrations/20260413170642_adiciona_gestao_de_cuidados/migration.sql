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
    `quantidade_instrucao` VARCHAR(191) NULL,
    `horario_preferencial` VARCHAR(191) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,
    `planta_id` INTEGER NOT NULL,
    `tipo_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoricoCuidado` (
    `id` VARCHAR(191) NOT NULL,
    `data_realizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observacoes` VARCHAR(191) NULL,
    `status` ENUM('CONCLUIDO', 'PULADO', 'ATRASADO', 'CANCELADO') NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,
    `cuidado_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cuidado` ADD CONSTRAINT `Cuidado_planta_id_fkey` FOREIGN KEY (`planta_id`) REFERENCES `Planta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuidado` ADD CONSTRAINT `Cuidado_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `CuidadoTipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoCuidado` ADD CONSTRAINT `HistoricoCuidado_cuidado_id_fkey` FOREIGN KEY (`cuidado_id`) REFERENCES `Cuidado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
