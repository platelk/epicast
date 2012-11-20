<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style/style.css">
		<link rel="stylesheet" href="style/mosaique_style.css">
		<link rel="stylesheet" href="style/tab.css">
		<title>Epicast</title>
	</head>
	<body>
		<header>
			<div id="logo">
				<span id="epi">
					Epi
				</span>
				<span id="cast">
					<p>Cast</p>
				</span>
			</div>
			<form id="connection" action="">
				<p id="sign">
					<span>
						Sign In
					</span>
				</p>
				<p>
					<input type="text" name="pseudo" id="pseudo" />
					<input type="password" name="password" id="password" />
					<input type="button" id="send" />
				</p>
			</form>
			<div id="connectionButton">
				<p>
					Connection
				</p>
			</div>
			<div id="connectionLog"></div>
		</header>
		<div id="video">
		</div>
		<div id="tabs">
			<ul id="tabs_selected">
				
			</ul>
		</div>
		<script type="text/javascript" src="js/libs/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="js/libs/jquery-ui-1.8.23.custom.min.js"></script>
		<script type="text/javascript" src="js/container.js"></script>
		<script type="text/javascript" src="js/mosaique.js"></script>
		<script type="text/javascript" src="js/tabs.js"></script>
		<script type="text/javascript" src="js/folder.js"></script>
		<script type="text/javascript" src="js/event_mosaique.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>