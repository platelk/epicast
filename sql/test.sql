-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Jeu 20 Décembre 2012 à 11:20
-- Version du serveur: 5.5.27
-- Version de PHP: 5.4.7

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_channel`(IN `a_name` VARCHAR(255), IN `a_description` TEXT, IN `a_image` TEXT, IN `a_owner` INT)
    NO SQL
BEGIN
	INSERT INTO channels
        VALUES (NULL, a_name, a_description, a_image, a_owner);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_comment`(
        	IN content TEXT,
                IN user_id INT
	)
BEGIN
	INSERT INTO comments
        VALUES (NULL, CURRENT_TIMESTAMP(), content, user_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_folder`(IN `name` VARCHAR(255), IN `description` VARCHAR(255), IN `owner` INT)
BEGIN
	INSERT INTO folders
        VALUES (NULL, name, description, owner);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_message`(IN `a_user_id` INT, IN `a_content` TEXT, IN `a_id_parent` INT, IN `a_id_message_channel` INT)
    NO SQL
BEGIN
	INSERT INTO message 
        VALUES (NULL, 
        	a_user_id, 
                a_id_parent, 
                a_content, 
                CURRENT_TIMESTAMP,
                a_id_message_channel);
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
	CALL add_folder('/', NULL, 0);
        
        SET @folder_id := (SELECT LAST_INSERT_ID());
        
        INSERT INTO users
        	VALUES (NULL,
                	username,
                        firstname,
                        lastname,
                        email,
                        MD5(password),
                        @folder_id,
                        0);
         UPDATE folders SET owner = LAST_INSERT_ID()
         WHERE id = @folder_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_video`(IN `a_name` VARCHAR(255), IN `a_description` TEXT, IN `a_image` TEXT, IN `a_video` TEXT, IN `a_live` TINYINT(1), IN `a_user_id` INT)
    NO SQL
BEGIN
	
	CALL create_message_channel(a_name, a_description);
        SET @tchat_id := (SELECT LAST_INSERT_ID());
        INSERT INTO videos VALUES(NULL, a_name, a_description, a_image, a_video, a_live, a_user_id, @tchat_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `can_add_in_channel`(IN `a_channel_id` INT, IN `a_begin` BIGINT)
    NO SQL
BEGIN
	SELECT COUNT(*) AS occurency FROM channel_video 
        WHERE channels_id = a_channel_id 
        AND a_begin 
        BETWEEN UNIX_TIMESTAMP(date_begin) 
        AND UNIX_TIMESTAMP(date_end);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `check_message`(IN `a_id_channel` INT, IN `a_id_parent` INT)
    NO SQL
BEGIN
	SELECT COUNT(*) INTO @channel FROM message_channel WHERE id = a_id_channel;
        IF a_id_parent > 0 THEN
        	SELECT COUNT(*) INTO @parent FROM message WHERE id = a_id_parent;
                IF @parent > 0 AND @channel > 0 THEN
                	SELECT 1 AS occurency;
                ELSE
                	SELECT 0 AS occurency;
                END IF;
        ELSE
        	SELECT @channel AS occurency;
        END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `check_password`(IN `a_username` VARCHAR(255), IN `a_password` VARCHAR(255))
BEGIN
        SELECT id FROM users WHERE username = a_username AND password = MD5(a_password);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `check_signup`(IN `a_username` VARCHAR(255), IN `a_email` VARCHAR(255), IN `a_type` VARCHAR(255))
    NO SQL
BEGIN
	SET @occu := 42;
	IF a_type = "username" THEN
        	SELECT COUNT(*) INTO @occu FROM users WHERE username = a_username;
        ELSEIF a_type = "email" THEN
        	SELECT COUNT(*) INTO @occu FROM users WHERE email = a_email;
        ELSEIF a_type = "all" THEN
        	SELECT COUNT(*) INTO @occu FROM users WHERE username = a_username OR email = a_email;
        END IF;
       	SELECT @occu AS occurency;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_channel`(IN `a_name` VARCHAR(255), IN `a_description` TEXT, IN `a_image` TEXT, IN `a_owner` INT, IN `a_folder_id` INT)
    NO SQL
BEGIN
	CALL add_channel(a_name, a_description, a_image, a_owner);
        SET @channel_id := LAST_INSERT_ID();
        INSERT INTO folder_channel VALUES(a_folder_id, @channel_id, 0, 0);     
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_folder`(IN `a_name` VARCHAR(255), IN `a_description` TEXT, IN `a_owner` INT, IN `a_folder_id` INT)
    NO SQL
BEGIN
	CALL add_folder(a_name, a_description, a_owner);
        SET @folder_id := LAST_INSERT_ID();
        INSERT INTO folder_folder VALUES(a_folder_id, @folder_id, 0, 0);    
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_message_channel`(IN `a_name` VARCHAR(255), IN `a_description` TEXT)
    NO SQL
BEGIN
	INSERT INTO message_channel
        VALUES(NULL, a_name, a_description);
        SELECT LAST_INSERT_ID() AS id_message_channel;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_channel`(IN `a_id` INT)
    NO SQL
BEGIN
	DELETE FROM channel_video
        WHERE channels_id = a_id;
        
        DELETE FROM folder_channel
        WHERE channels_id = a_id;
        
        DELETE FROM tag_channel
        WHERE channels_id = a_id;
        
        DELETE FROM comment_channel
        WHERE channels_id = a_id;
        
	DELETE FROM channels
        WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_comment`(IN `a_id` INT)
BEGIN
	DELETE FROM comment_folder
        WHERE comments_id = a_id;
        
        DELETE FROM comment_channel
        WHERE comments_id = a_id;
        
        DELETE FROM comment_video
        WHERE comments_id = a_id;
        
	DELETE FROM comment_group
        WHERE comments_id = a_id;
        
        DELETE FROM comments
        WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_folder`(IN `a_id` INT)
    NO SQL
BEGIN
	DELETE FROM folder_folder
        WHERE subfolders_id = a_id;
        
        DELETE FROM folder_channel
        WHERE folders_id = a_id;
        
        DELETE FROM folder_video
        WHERE folders_id = a_id;
        
        DELETE FROM folders
        WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_message`(IN `a_id` INT)
    NO SQL
BEGIN
	DELETE FROM message
        WHERE id = a_id;
        
        DELETE FROM message_video
        WHERE id_message = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_tag`(IN `a_id` INT)
    NO SQL
BEGIN
	DELETE FROM tag_channel
        WHERE tags_id = a_id;
        
        DELETE FROM tag_video
        WHERE tags_id = a_id;
        
        DELETE FROM tags
        WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user`(
        	IN user_id INT
        )
BEGIN
	DELETE FROM users
        WHERE id = user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_video`(IN `a_id` INT)
    NO SQL
BEGIN
	DELETE FROM folder_video
        WHERE videos_id = a_id;
        
        DELETE FROM channel_video
        WHERE videos_id = a_id;
        
        DELETE FROM comment_video
        WHERE videos_id = a_id;
        
        DELETE FROM tag_video
        WHERE videos_id = a_id;
        
	DELETE FROM videos
        WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_buffer_zone`(IN `a_id` INT)
    NO SQL
BEGIN
	SELECT * FROM videos WHERE user_id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_channel`(IN `a_id` INT)
    NO SQL
BEGIN
	SELECT * FROM channels WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_channel_content`(IN `a_id` INT)
    NO SQL
BEGIN
	SELECT v.id,v.name, v.description, v.image, v.video, v.live, cv.date_begin, cv.date_end, cv.offset  
	FROM channels AS c 
	JOIN channel_video AS cv 
	JOIN videos AS v 
	ON c.id = cv.channels_id 
	AND v.id = cv.videos_id 
	WHERE c.id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_folder`(IN `a_id` INT)
    NO SQL
BEGIN
	SELECT * FROM folders WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_folder_content`(IN `a_folder_id` INT)
BEGIN
	SELECT f.id, f.name, f.description, ff.x, ff.y 
        FROM folders AS f 
        JOIN folder_folder AS ff 
        ON ff.subfolders_id = f.id 
        WHERE ff.folders_id = a_folder_id;
        
        SELECT c.id, c.name, c.description, c.image, fc.x, fc.y 
        FROM channels AS c 
        JOIN folder_channel AS fc 
        ON fc.channels_id = c.id 
        WHERE fc.folders_id = a_folder_id;
        
        SELECT v.id, v.name, v.description, v.image, v.video, v.live, v.user_id, fv.weight, fv.x, fv.y, v.tchat_id 
        FROM videos AS v 
        JOIN folder_video AS fv 
        ON fv.videos_id = v.id 
        WHERE fv.folders_id = a_folder_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_folder_from_user`(IN `a_user_id` INT)
BEGIN
        SELECT folders.id, folders.name, folders.description, ff.x, ff.y 
        FROM folder_folder AS ff 
        JOIN users 
        JOIN folders 
        ON ff.folders_id = users.folders_id 
        AND ff.subfolders_id = folders.id 
        WHERE users.id = a_user_id;
        
        SELECT channels.id, channels.name, channels.description, channels.image, fc.x, fc.y
        FROM folder_channel AS fc
        JOIN users 
        JOIN channels 
        ON fc.folders_id = users.folders_id 
        AND fc.channels_id = channels.id 
        WHERE users.id = a_user_id;
        
        SELECT videos.id, videos.live, videos.name, videos.description, videos.image, videos.video, fv.x, fv.y, videos.tchat_id 
        FROM folder_video AS fv
        JOIN users 
        JOIN videos 
        ON fv.folders_id = users.folders_id 
        AND fv.videos_id = videos.id 
        WHERE users.id = a_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_information_by_name`(IN `a_name` VARCHAR(255))
    NO SQL
BEGIN
	SELECT * FROM users WHERE username = a_name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_message`(IN `a_id` INT, IN `a_nbr` INT, IN `a_begin` INT)
    NO SQL
BEGIN
	SELECT message.id, user_id, id_parent, content, date, username  FROM message 
        JOIN users
        ON users.id = message.user_id
        WHERE id_message_channel = a_id
        LIMIT a_begin, a_nbr;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_message_by_id`(IN `a_id` INT)
    NO SQL
BEGIN
	SELECT * FROM message WHERE id = a_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_informations`(
        	IN a_user_id INT
        )
BEGIN
        SELECT * FROM users WHERE id = a_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_video`(IN `v_id` INT)
    NO SQL
BEGIN
	SELECT * FROM videos WHERE id = v_id;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `move`(IN `a_elm_type` VARCHAR(255), IN `a_x` INT, IN `a_y` INT, IN `a_elm_id` INT, IN `a_folder_id` INT)
    NO SQL
BEGIN
        IF a_elm_type = "video" THEN
        	UPDATE folder_video
		SET x = a_x, y = a_y
		WHERE videos_id = a_elm_id
		AND folders_id = a_folder_id;
        ELSEIF a_elm_type = "folder" THEN
             	UPDATE folder_folder
		SET x = a_x, y = a_y
		WHERE subfolders_id = a_elm_id
		AND folders_id = a_folder_id;
        ELSEIF a_elm_type = "channel" THEN
        	UPDATE folder_channel
		SET x = a_x, y = a_y
		WHERE channels_id = a_elm_id
		AND folders_id = a_folder_id;
        END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `move_from_buffer_to_channel`(IN `a_video_id` INT, IN `a_container_id` INT, IN `a_date_begin` BIGINT, IN `a_date_end` BIGINT, IN `a_offset` INT)
    NO SQL
BEGIN	
       	INSERT INTO channel_video
        VALUES(a_video_id,
       	       a_container_id,
               FROM_UNIXTIME(a_date_begin),
               FROM_UNIXTIME(a_date_end), 
               a_offset);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `move_from_buffer_to_folder`(IN `a_video_id` INT, IN `a_container_id` INT)
    NO SQL
BEGIN
	SET @occu := 0;
	SELECT COUNT(*) INTO @occu 
        FROM folder_video 
        WHERE videos_id = a_video_id 
        AND folders_id = a_container_id;
       	IF @occu = 0 THEN
        	INSERT INTO folder_video
        	VALUES(a_video_id,
       	       	a_container_id,
               	1,
               	0,
               	0);
        END IF;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `video_exist`(IN `a_id` INT)
    NO SQL
BEGIN
	SELECT COUNT(*) AS occurency FROM videos WHERE id = a_id;
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
  `owner` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `channels`
--

INSERT INTO `channels` (`id`, `name`, `description`, `image`, `owner`) VALUES
(4, 'bites', 'bite', 'bite', 15),
(5, 'bitouille', 'mdmdmdmdmdmdmdmdmdmdm', 'mdmamdmamdkksksd amamammals', 16),
(6, 'bite', 'kdkdkdk', 'ddddd', 15);

-- --------------------------------------------------------

--
-- Structure de la table `channel_video`
--

CREATE TABLE IF NOT EXISTS `channel_video` (
  `videos_id` int(10) unsigned NOT NULL,
  `channels_id` int(10) unsigned NOT NULL,
  `date_begin` timestamp NULL DEFAULT NULL,
  `date_end` timestamp NULL DEFAULT NULL,
  `offset` int(11) DEFAULT NULL,
  KEY `fk_channel_video_videos1_idx` (`videos_id`),
  KEY `fk_channel_video_channels1_idx` (`channels_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `channel_video`
--

INSERT INTO `channel_video` (`videos_id`, `channels_id`, `date_begin`, `date_end`, `offset`) VALUES
(1, 5, '2012-12-04 23:00:00', '2012-12-25 23:00:00', 0),
(11, 5, '1970-01-01 00:00:10', '1970-01-01 00:00:42', 10);

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  `owner` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Contenu de la table `folders`
--

INSERT INTO `folders` (`id`, `name`, `description`, `owner`) VALUES
(20, '/', 'root', 15),
(22, '/', NULL, 16),
(23, '/', NULL, 17),
(24, '/', NULL, 18),
(25, '/', NULL, 0),
(26, 'bite', 'bite', 0),
(27, '/', NULL, 19),
(34, '/', NULL, 20),
(35, '/', NULL, 0),
(36, '/', NULL, 0),
(37, '/', NULL, 0),
(38, 'test_create_folder', 'je test avec parent  = 20', 15),
(39, '/', NULL, 21),
(40, '/', NULL, 16);

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
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  KEY `fk_folder_channel_folders1_idx` (`folders_id`),
  KEY `fk_folder_channel_channels1_idx` (`channels_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `folder_channel`
--

INSERT INTO `folder_channel` (`folders_id`, `channels_id`, `x`, `y`) VALUES
(20, 4, 0, 0),
(20, 6, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `folder_folder`
--

CREATE TABLE IF NOT EXISTS `folder_folder` (
  `folders_id` int(10) unsigned NOT NULL,
  `subfolders_id` int(10) unsigned NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  KEY `fk_Folder_Folder_Folders1_idx` (`folders_id`),
  KEY `fk_Folder_Folder_Folders2_idx` (`subfolders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `folder_folder`
--

INSERT INTO `folder_folder` (`folders_id`, `subfolders_id`, `x`, `y`) VALUES
(20, 38, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `folder_video`
--

CREATE TABLE IF NOT EXISTS `folder_video` (
  `videos_id` int(10) unsigned NOT NULL,
  `folders_id` int(10) unsigned NOT NULL,
  `weight` tinyint(3) unsigned NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  KEY `fk_Folder_Video_Videos1_idx` (`videos_id`),
  KEY `fk_Folder_Video_Folders1_idx` (`folders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `folder_video`
--

INSERT INTO `folder_video` (`videos_id`, `folders_id`, `weight`, `x`, `y`) VALUES
(2, 20, 1, 0, 0),
(1, 20, 1, 5, 5);

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
-- Structure de la table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_message_channel` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `message`
--

INSERT INTO `message` (`id`, `user_id`, `id_parent`, `content`, `date`, `id_message_channel`) VALUES
(12, 16, 0, 'harold', '2012-12-18 16:26:24', 50),
(13, 15, -1, 'oisvklkm', '2012-12-18 16:08:41', 10),
(14, 15, 0, 'harold', '2012-12-18 16:13:45', 10),
(15, 15, 13, 'harold', '2012-12-18 16:14:03', 10),
(16, 15, 0, 'harold', '2012-12-18 16:17:52', 10),
(18, 15, 0, 'harold', '2012-12-18 16:21:05', 10),
(19, 15, 0, 'harold', '2012-12-18 16:21:22', 10),
(20, 15, -1, 'kdkdkdkdk', '2012-12-18 16:22:12', 10);

-- --------------------------------------------------------

--
-- Structure de la table `message_channel`
--

CREATE TABLE IF NOT EXISTS `message_channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `message_channel`
--

INSERT INTO `message_channel` (`id`, `name`, `comment`) VALUES
(10, 'bitouillellll', 'ddhdhd');

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
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `Folders_id_UNIQUE` (`folders_id`),
  KEY `fk_Users_Folders_idx` (`folders_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `folders_id`, `deleted`) VALUES
(15, 'plop42', 'plop42', 'plop42', 'plop42', 'a8283b877a65d46d9e8f533af53b9876', 20, 0);

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
  `tchat_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `videos`
--

INSERT INTO `videos` (`id`, `name`, `description`, `image`, `video`, `live`, `user_id`, `tchat_id`) VALUES
(1, 'video_test', 'je teste lololololiloll', 'toto.jpg', 'toto.avi', 0, 15, 0),
(2, 'toto', 'titi', 'toto.jpg', 'titi.avi', 0, 15, 0),
(3, 'ppp', 'ppp', 'ppp', '1352974533.15', 0, 15, 0),
(5, 'plop', 'll', 'lllll', '1352979420.15', 0, 15, 0),
(6, 'test_v', 'kkk', 'k', 'kk', 0, 15, 0),
(8, 'tototototo', 'oooo', 'oooo', 'kfkfkfkfkfkfkfk', 0, 15, 0),
(10, 'tototototocool', 'oooo', 'oooo', 'kfkfkfkfkfkfkfk', 0, 15, 0),
(11, 'tototototocoollool', 'oooo', 'oooo', 'kfkfkfkfkfkfkfk', 0, 15, 0),
(12, 'bip', 'bipbip', 'bip.png', 'plop.avi', 0, 15, 0),
(13, 'youyou', 'jjd', 'jdjjdjdjdj', 'kdjkkkd', 0, 16, 0),
(14, 'bitouillellll', 'ddhdhd', 'plop', 'ddjdjd', 0, 15, 10);

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
