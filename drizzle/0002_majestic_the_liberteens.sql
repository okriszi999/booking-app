CREATE TABLE `contractors` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text,
	`phone` varchar(256),
	CONSTRAINT `contractors_id` PRIMARY KEY(`id`),
	CONSTRAINT `contractors_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `random` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text,
	CONSTRAINT `random_id` PRIMARY KEY(`id`)
);
