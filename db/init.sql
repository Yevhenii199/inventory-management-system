-- Створення структури
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serial_number` INT NOT NULL,
  `is_new` TINYINT(1) NOT NULL DEFAULT 1,
  `photo` VARCHAR(255) NULL,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `specification` TEXT NULL,
  `guarantee_start` DATETIME NOT NULL,
  `guarantee_end` DATETIME NOT NULL,
  `date` DATETIME NOT NULL,
  `order_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_products_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `prices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `value` DECIMAL(10, 2) NOT NULL,
  `symbol` VARCHAR(10) NOT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_prices_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Наповнення початковими даними (Seed)
INSERT INTO `orders` (id, title, date, description) VALUES 
(1, 'Order 1', '2017-06-29 12:09:33', 'desc'),
(2, 'Order 2', '2017-06-29 12:09:33', 'desc');

INSERT INTO `products` (id, serial_number, is_new, photo, title, type, specification, guarantee_start, guarantee_end, date, order_id) VALUES 
(1, 1234, 1, 'pathToFile.jpg', 'Product 1', 'Monitors', 'Specification 1', '2017-06-29 12:09:33', '2017-06-29 12:09:33', '2017-06-29 12:09:33', 1),
(2, 5678, 1, 'pathToFile.jpg', 'Product 2', 'Monitors', 'Specification 2', '2017-06-29 12:09:33', '2017-06-29 12:09:33', '2017-06-29 12:09:33', 2);

INSERT INTO `prices` (product_id, value, symbol, is_default) VALUES 
(1, 100, 'USD', 0), (1, 2600, 'UAH', 1),
(2, 100, 'USD', 0), (2, 2600, 'UAH', 1);