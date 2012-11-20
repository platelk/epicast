-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 19 Septembre 2012 à 07:56
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `test`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_comment`(
        	IN content TEXT,
                IN user_id INT
	)
BEGIN
	INSERT INTO comments
        VALUES (NULL, CURRENT_TIMESTAMP(), content, user_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_folder`( 
      		IN name		VARCHAR(255), 
      		IN description	VARCHAR(255) 
   	)
BEGIN
	INSERT INTO folders
        VALUES (NULL, name, description);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_tag`(
	IN tag_name VARCHAR(255)
	)
BEGIN
	SET @occu := 0;
        
        SELECT COUNT(*) INTO @occu
        FROM tags
        WHERE name = tag_name;

	IF @occu > 0 THEN
        	UPDATE tags SET occurency = occurency + 1 WHERE name = tag_name;
        ELSE
        	INSERT INTO tags VALUES(NULL, tag_name, 1);
        END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(IN `username` VARCHAR(45), IN `firstname` VARCHAR(45), IN `lastname` VARCHAR(45), IN `email` VARCHAR(255), IN `password` VARCHAR(255))
BEGIN
	CALL add_folder('/', NULL);
        
        SET @folder_id := (SELECT LAST_INSERT_ID());
        
        INSERT INTO users
        	VALUES (NULL,
                	username,
                        firstname,
                        lastname,
                        email,
                        password,
                        @folder_id);
         SELECT LAST_INSERT_ID() AS id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `check_password`(IN `a_username` VARCHAR(255), IN `a_password` VARCHAR(255))
BEGIN
        SELECT id FROM users WHERE username = a_username AND password = MD5(a_password);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_folder_rights`(
        	IN name 			VARCHAR(45),
                IN delete_folder		BOOL,
                IN rename_folder		BOOL,
                IN edit_folder_description	BOOL,
                IN create_subfolder		BOOL,
                IN add_video			BOOL,
                IN rename_video			BOOL,
                IN edit_video_description	BOOL,
                IN delete_video			BOOL,
                IN change_rights		BOOL,
                IN watch_stats			BOOL
	)
BEGIN
	INSERT INTO folders_rights
        VALUES (NULL, name, delete_folder, rename_folder, edit_folder_description, create_subfolder, add_video, rename_video, edit_video_description, delete_video, change_rights, watch_stats);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_group_rights`(IN `name` VARCHAR(255), IN `delete_group` INT, IN `rename_group` INT, IN `edit_group_desciption` INT, IN `change_rights` INT, IN `watch_stats` INT)
BEGIN
	INSERT INTO groups_rights
        VALUES (NULL, name, delete_group, rename_group, edit_group_desciption, change_rights, watch_stats);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_comment`(
                IN comment_id INT
        )
BEGIN
	DELETE FROM comments
        WHERE id = comment_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user`(
        	IN user_id INT
        )
BEGIN
	DELETE FROM users
        WHERE id = user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_folder_from_user`(
        	IN a_user_id INT
        )
BEGIN
        SELECT folders.id, folders.name, folders.description 
        FROM folder_folder 
        JOIN users 
        JOIN folders 
        ON folder_folder.folders_id = users.folders_id 
        AND folder_folder.subfolders_id = folders.id 
        WHERE users.id = a_user_id;
        
        SELECT channels.id, channels.name, channels.description, channels.image 
        FROM folder_channel 
        JOIN users 
        JOIN channels 
        ON folder_channel.folders_id = users.folders_id 
        AND folder_channel.channels_id = channels.id 
        WHERE users.id = a_user_id;
        
        SELECT videos.id, videos.live, videos.name, videos.description, videos.image, videos.video 
        FROM folder_video 
        JOIN users 
        JOIN videos 
        ON folder_video.folders_id = users.folders_id 
        AND folder_video.videos_id = videos.id 
        WHERE users.id = a_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_informations`(
        	IN a_user_id INT
        )
BEGIN
        SELECT * FROM users WHERE id = a_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `liste_user`()
BEGIN
        DECLARE var_identifiant VARCHAR(64);
        DECLARE var_mot_passe VARCHAR(32);
        DECLARE curseur1 CURSOR FOR SELECT username, password FROM users;
 
        OPEN curseur1;
 
        FETCH curseur1 INTO var_identifiant, var_mot_passe;
        SELECT var_identifiant, var_mot_passe;
 
        FETCH curseur1 INTO var_identifiant, var_mot_passe;
        SELECT var_identifiant, var_mot_passe;

        CLOSE curseur1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `t_delete_content_channel`(IN `a_channel_id` INT)
BEGIN
        DELETE FROM channel_video
        WHERE channels_id = a_channel_id; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `t_delete_content_folder`(IN `a_folder_id` INT)
BEGIN
	DECLARE done INT DEFAULT 0;
        DECLARE t_channel_id INT;
        DECLARE cursor_channel CURSOR FOR SELECT channels_id FROM folder_channel WHERE folders_id = a_folder_id;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
        OPEN cursor_channel;
        	cur_loop:
        	WHILE (done = 0) DO
        		FETCH cursor_channel INTO t_channel_id;                  
                        CALL t_delete_content_channel(t_channel_id);
                	IF done = 1 THEN
                		LEAVE cur_loop;
        		END IF;
    		END WHILE cur_loop;
        CLOSE cursor_channel;
        DELETE FROM folder_video WHERE folders_id = a_folder_id;
	CALL delete_folder(a_folder_id);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `channels`
--

CREATE TABLE IF NOT EXISTS `channels` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `channels`
--

INSERT INTO `channels` (`id`, `name`, `description`, `image`) VALUES
(1, 'toto', 'ooooo', 'jjjj'),
(3, 'toto m', 'ooooo', 'jjjj');

-- --------------------------------------------------------

--
-- Structure de la table `channel_video`
--

CREATE TABLE IF NOT EXISTS `channel_video` (
  `videos_id` int(10) unsigned NOT NULL,
  `channels_id` int(10) unsigned NOT NULL,
  `date_begin` timestamp NULL DEFAULT NULL,
  `date_end` timestamp NULL DEFAULT NULL,
  `offset` time DEFAULT NULL,
  KEY `fk_channel_video_videos1_idx` (`videos_id`),
  KEY `fk_channel_video_channels1_idx` (`channels_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `channel_video`
--

INSERT INTO `channel_video` (`videos_id`, `channels_id`, `date_begin`, `date_end`, `offset`) VALUES
(1, 1, '2012-09-14 08:34:36', '2012-09-14 08:34:36', NULL),
(2, 1, '2012-09-14 08:34:36', '2012-09-14 08:34:36', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` text NOT NULL,
  `users_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_users1_idx` (`users_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `comments`
--

INSERT INTO `comments` (`id`, `date`, `content`, `users_id`) VALUES
(2, '2012-09-12 11:43:06', 'toto', 3);

-- --------------------------------------------------------

--
-- Structure de la table `comment_channel`
--

CREATE TABLE IF NOT EXISTS `comment_channel` (
  `channels_id` int(10) unsigned NOT NULL,
  `comments_id` int(10) unsigned NOT NULL,
  KEY `fk_comment_channel_channels1_idx` (`channels_id`),
  KEY `fk_comment_channel_comments1_idx` (`comments_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `comment_folder`
--

CREATE TABLE IF NOT EXISTS `comment_folder` (
  `comments_id` int(10) unsigned NOT NULL,
  `folders_id` int(10) unsigned NOT NULL,
  KEY `fk_comment_folder_comments1_idx` (`comments_id`),
  KEY `fk_comment_folder_folders1_idx` (`folders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `comment_group`
--

CREATE TABLE IF NOT EXISTS `comment_group` (
  `comments_id` int(10) unsigned NOT NULL,
  `groups_id` int(10) unsigned NOT NULL,
  KEY `fk_comment_group_comments1_idx` (`comments_id`),
  KEY `fk_comment_group_groups1_idx` (`groups_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `comment_video`
--

CREATE TABLE IF NOT EXISTS `comment_video` (
  `videos_id` int(10) unsigned NOT NULL,
  `comments_id` int(10) unsigned NOT NULL,
  KEY `fk_comment_video_videos1_idx` (`videos_id`),
  KEY `fk_comment_video_comments1_idx` (`comments_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `folders`
--

CREATE TABLE IF NOT EXISTS `folders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Contenu de la table `folders`
--

INSERT INTO `folders` (`id`, `name`, `description`) VALUES
(1, 'root', 'my cloud in the rainbow.'),
(2, 'haha', 'nnnnn'),
(12, '/', NULL),
(13, 'my_folder2', 'ff'),
(14, 'my_folder 3', 'fff'),
(15, '/', NULL),
(16, '/', NULL),
(17, '/', NULL),
(18, '/', NULL),
(19, '/', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `folders_rights`
--

CREATE TABLE IF NOT EXISTS `folders_rights` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `delete_folder` tinyint(1) NOT NULL,
  `rename_folder` tinyint(1) NOT NULL,
  `edit_folder_description` tinyint(1) NOT NULL,
  `create_subfolder` tinyint(1) NOT NULL,
  `add_video` tinyint(1) NOT NULL,
  `rename_video` tinyint(1) NOT NULL,
  `edit_video_description` tinyint(1) NOT NULL,
  `delete_video` tinyint(1) NOT NULL,
  `change_rights` tinyint(1) NOT NULL,
  `watch_stats` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `folder_channel`
--

CREATE TABLE IF NOT EXISTS `folder_channel` (
  `folders_id` int(10) unsigned NOT NULL,
  `channels_id` int(10) unsigned NOT NULL,
  `coordinate` point NOT NULL,
  KEY `fk_folder_channel_folders1_idx` (`folders_id`),
  KEY `fk_folder_channel_channels1_idx` (`channels_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `folder_channel`
--

INSERT INTO `folder_channel` (`folders_id`, `channels_id`, `coordinate`) VALUES
(1, 1, ''),
(1, 3, '');

-- --------------------------------------------------------

--
-- Structure de la table `folder_folder`
--

CREATE TABLE IF NOT EXISTS `folder_folder` (
  `folders_id` int(10) unsigned NOT NULL,
  `subfolders_id` int(10) unsigned NOT NULL,
  `coordinate` point NOT NULL,
  KEY `fk_Folder_Folder_Folders1_idx` (`folders_id`),
  KEY `fk_Folder_Folder_Folders2_idx` (`subfolders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `folder_folder`
--

INSERT INTO `folder_folder` (`folders_id`, `subfolders_id`, `coordinate`) VALUES
(1, 2, ''),
(1, 12, ''),
(2, 13, '');

-- --------------------------------------------------------

--
-- Structure de la table `folder_video`
--

CREATE TABLE IF NOT EXISTS `folder_video` (
  `videos_id` int(10) unsigned NOT NULL,
  `folders_id` int(10) unsigned NOT NULL,
  `weight` tinyint(3) unsigned NOT NULL,
  `coordinate` point NOT NULL,
  KEY `fk_Folder_Video_Videos1_idx` (`videos_id`),
  KEY `fk_Folder_Video_Folders1_idx` (`folders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `folder_video`
--

INSERT INTO `folder_video` (`videos_id`, `folders_id`, `weight`, `coordinate`) VALUES
(1, 1, 1, '\0\0\0\0\0\0\0\0\0\0\0\0\0�?\0\0\0\0\0\0�?'),
(1, 12, 3, '');

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` text,
  `folders_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_groups_folders1_idx` (`folders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `groups_rights`
--

CREATE TABLE IF NOT EXISTS `groups_rights` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `delete_group` tinyint(1) NOT NULL,
  `rename_group` tinyint(1) NOT NULL,
  `edit_group_description` tinyint(1) NOT NULL,
  `change_rights` tinyint(1) NOT NULL,
  `watch_stats` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `group_group`
--

CREATE TABLE IF NOT EXISTS `group_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `groups_id` int(10) unsigned NOT NULL,
  `groups_id1` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_group_group_groups1_idx` (`groups_id`),
  KEY `fk_group_group_groups2_idx` (`groups_id1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `group_group_folder_rights`
--

CREATE TABLE IF NOT EXISTS `group_group_folder_rights` (
  `folders_rights_id` int(10) unsigned NOT NULL,
  `folders_id` int(10) unsigned NOT NULL,
  `group_group_id` int(10) unsigned NOT NULL,
  KEY `fk_group_group_folder_rights_folders_rights1_idx` (`folders_rights_id`),
  KEY `fk_group_group_folder_rights_folders1_idx` (`folders_id`),
  KEY `fk_group_group_folder_rights_group_group1_idx` (`group_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `group_group_group_rights`
--

CREATE TABLE IF NOT EXISTS `group_group_group_rights` (
  `groups_rights_id` int(10) unsigned NOT NULL,
  `group_group_id` int(10) unsigned NOT NULL,
  KEY `fk_group_group_group_rights_groups_rights1_idx` (`groups_rights_id`),
  KEY `fk_group_group_group_rights_group_group1_idx` (`group_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `occurency` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `tags`
--

INSERT INTO `tags` (`id`, `name`, `occurency`) VALUES
(1, 'titi', 2),
(2, 'toto', 1);

-- --------------------------------------------------------

--
-- Structure de la table `tag_channel`
--

CREATE TABLE IF NOT EXISTS `tag_channel` (
  `tags_id` int(10) unsigned NOT NULL,
  `channels_id` int(10) unsigned NOT NULL,
  KEY `fk_tag_channel_tags1_idx` (`tags_id`),
  KEY `fk_tag_channel_channels1_idx` (`channels_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tag_group`
--

CREATE TABLE IF NOT EXISTS `tag_group` (
  `tags_id` int(10) unsigned NOT NULL,
  `groups_id` int(10) unsigned NOT NULL,
  KEY `fk_tag_group_tags1_idx` (`tags_id`),
  KEY `fk_tag_group_groups1_idx` (`groups_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tag_video`
--

CREATE TABLE IF NOT EXISTS `tag_video` (
  `tags_id` int(10) unsigned NOT NULL,
  `videos_id` int(10) unsigned NOT NULL,
  KEY `fk_tag_video_tags1_idx` (`tags_id`),
  KEY `fk_tag_video_videos1_idx` (`videos_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `folders_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `Folders_id_UNIQUE` (`folders_id`),
  KEY `fk_Users_Folders_idx` (`folders_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `folders_id`) VALUES
(3, 'J&B', 'JB', 'louazel', 'lolilol@kro.fr', 'f71dbe52628a3f83a77ab494817525c6', 1),
(4, 'dds', 'ssss', 'ssss', 'ssss', 'aa', 2),
(6, 'harold', 'dd', 'dd', 'ff', 'f71dbe52628a3f83a77ab494817525c6', 13),
(11, 'coucou', 'pp', 'pp', 'pp', 'plop', 19);

-- --------------------------------------------------------

--
-- Structure de la table `user_group`
--

CREATE TABLE IF NOT EXISTS `user_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `users_id` int(10) unsigned NOT NULL,
  `groups_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_group_users1_idx` (`users_id`),
  KEY `fk_user_group_groups1_idx` (`groups_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `user_group_folder_rights`
--

CREATE TABLE IF NOT EXISTS `user_group_folder_rights` (
  `folders_id` int(10) unsigned NOT NULL,
  `folders_rights_id` int(10) unsigned NOT NULL,
  `user_group_id` int(10) unsigned NOT NULL,
  KEY `fk_user_group_folder_rights_folders1_idx` (`folders_id`),
  KEY `fk_user_group_folder_rights_folders_rights1_idx` (`folders_rights_id`),
  KEY `fk_user_group_folder_rights_user_group1_idx` (`user_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_group_group_rights`
--

CREATE TABLE IF NOT EXISTS `user_group_group_rights` (
  `user_group_id` int(10) unsigned NOT NULL,
  `groups_rights_id` int(10) unsigned NOT NULL,
  KEY `fk_user_group_group_rights_user_group1_idx` (`user_group_id`),
  KEY `fk_user_group_group_rights_groups_rights1_idx` (`groups_rights_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` text,
  `video` text NOT NULL,
  `live` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `videos`
--

INSERT INTO `videos` (`id`, `name`, `description`, `image`, `video`, `live`, `user_id`) VALUES
(1, 'video_test', 'je teste lololololiloll', 'toto.jpg', 'toto.avi', 0, 0),
(2, 'toto', 'titi', 'toto.jpg', 'titi.avi', 0, 0);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `channel_video`
--
ALTER TABLE `channel_video`
  ADD CONSTRAINT `fk_channel_video_channels1` FOREIGN KEY (`channels_id`) REFERENCES `channels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_channel_video_videos1` FOREIGN KEY (`videos_id`) REFERENCES `videos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `comment_channel`
--
ALTER TABLE `comment_channel`
  ADD CONSTRAINT `fk_comment_channel_channels1` FOREIGN KEY (`channels_id`) REFERENCES `channels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comment_channel_comments1` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `comment_folder`
--
ALTER TABLE `comment_folder`
  ADD CONSTRAINT `fk_comment_folder_comments1` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comment_folder_folders1` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `comment_group`
--
ALTER TABLE `comment_group`
  ADD CONSTRAINT `fk_comment_group_comments1` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comment_group_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `comment_video`
--
ALTER TABLE `comment_video`
  ADD CONSTRAINT `fk_comment_video_comments1` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comment_video_videos1` FOREIGN KEY (`videos_id`) REFERENCES `videos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `folder_channel`
--
ALTER TABLE `folder_channel`
  ADD CONSTRAINT `fk_folder_channel_channels1` FOREIGN KEY (`channels_id`) REFERENCES `channels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_folder_channel_folders1` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `folder_folder`
--
ALTER TABLE `folder_folder`
  ADD CONSTRAINT `fk_Folder_Folder_Folders1` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Folder_Folder_Folders2` FOREIGN KEY (`subfolders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `folder_video`
--
ALTER TABLE `folder_video`
  ADD CONSTRAINT `fk_Folder_Video_Folders1` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Folder_Video_Videos1` FOREIGN KEY (`videos_id`) REFERENCES `videos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `fk_groups_folders1` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `group_group`
--
ALTER TABLE `group_group`
  ADD CONSTRAINT `fk_group_group_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_group_group_groups2` FOREIGN KEY (`groups_id1`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `group_group_folder_rights`
--
ALTER TABLE `group_group_folder_rights`
  ADD CONSTRAINT `fk_group_group_folder_rights_folders1` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_group_group_folder_rights_folders_rights1` FOREIGN KEY (`folders_rights_id`) REFERENCES `folders_rights` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_group_group_folder_rights_group_group1` FOREIGN KEY (`group_group_id`) REFERENCES `group_group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `group_group_group_rights`
--
ALTER TABLE `group_group_group_rights`
  ADD CONSTRAINT `fk_group_group_group_rights_groups_rights1` FOREIGN KEY (`groups_rights_id`) REFERENCES `groups_rights` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_group_group_group_rights_group_group1` FOREIGN KEY (`group_group_id`) REFERENCES `group_group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `tag_channel`
--
ALTER TABLE `tag_channel`
  ADD CONSTRAINT `fk_tag_channel_channels1` FOREIGN KEY (`channels_id`) REFERENCES `channels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tag_channel_tags1` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `tag_group`
--
ALTER TABLE `tag_group`
  ADD CONSTRAINT `fk_tag_group_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tag_group_tags1` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `tag_video`
--
ALTER TABLE `tag_video`
  ADD CONSTRAINT `fk_tag_video_tags1` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tag_video_videos1` FOREIGN KEY (`videos_id`) REFERENCES `videos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_Users_Folders` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user_group`
--
ALTER TABLE `user_group`
  ADD CONSTRAINT `fk_user_group_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_group_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user_group_folder_rights`
--
ALTER TABLE `user_group_folder_rights`
  ADD CONSTRAINT `fk_user_group_folder_rights_folders1` FOREIGN KEY (`folders_id`) REFERENCES `folders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_group_folder_rights_folders_rights1` FOREIGN KEY (`folders_rights_id`) REFERENCES `folders_rights` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_group_folder_rights_user_group1` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user_group_group_rights`
--
ALTER TABLE `user_group_group_rights`
  ADD CONSTRAINT `fk_user_group_group_rights_groups_rights1` FOREIGN KEY (`groups_rights_id`) REFERENCES `groups_rights` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_group_group_rights_user_group1` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
