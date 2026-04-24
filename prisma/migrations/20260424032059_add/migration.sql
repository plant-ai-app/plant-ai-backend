-- DropForeignKey
ALTER TABLE `cuidado` DROP FOREIGN KEY `Cuidado_planta_id_fkey`;

-- DropForeignKey
ALTER TABLE `historicocuidado` DROP FOREIGN KEY `HistoricoCuidado_cuidado_id_fkey`;

-- DropForeignKey
ALTER TABLE `planta` DROP FOREIGN KEY `Planta_fk_usuario_id_fkey`;

-- DropIndex
DROP INDEX `HistoricoCuidado_cuidado_id_fkey` ON `historicocuidado`;

-- DropIndex
DROP INDEX `Planta_fk_usuario_id_fkey` ON `planta`;

-- AddForeignKey
ALTER TABLE `Planta` ADD CONSTRAINT `Planta_fk_usuario_id_fkey` FOREIGN KEY (`fk_usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuidado` ADD CONSTRAINT `Cuidado_planta_id_fkey` FOREIGN KEY (`planta_id`) REFERENCES `Planta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoCuidado` ADD CONSTRAINT `HistoricoCuidado_cuidado_id_fkey` FOREIGN KEY (`cuidado_id`) REFERENCES `Cuidado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
