CREATE TABLE IF NOT EXISTS secret (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `protected` TINYINT(1) NOT NULL DEFAULT 0,
    `timestamp` BIGINT(11) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `identity` TEXT DEFAULT NULL,
    `link` TEXT DEFAULT NULL,
    `secret` TEXT NOT NULL,
    KEY `timestamp_idx` (`timestamp`),
    UNIQUE KEY `name_idx` (`name`),
    PRIMARY KEY (`id`)
);
