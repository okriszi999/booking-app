ALTER TABLE `contractors` RENAME COLUMN `first_name` TO `firstName`;--> statement-breakpoint
ALTER TABLE `contractors` RENAME COLUMN `last_name` TO `lastName`;--> statement-breakpoint
ALTER TABLE `contractors` MODIFY COLUMN `email` varchar(256) NOT NULL;