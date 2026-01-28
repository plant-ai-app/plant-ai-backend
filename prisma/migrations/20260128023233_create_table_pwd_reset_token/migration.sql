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

-- AddForeignKey
ALTER TABLE `pwd_reset_token` ADD CONSTRAINT `pwd_reset_token_fk_usuario_id_fkey` FOREIGN KEY (`fk_usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
