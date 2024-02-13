<?php  include('../config.php'); ?>
<?php include(ROOT_PATH . '/admin/includes/admin_functions.php'); ?>
<?php include(ROOT_PATH . '/admin/includes/head_section.php'); ?>

        <title>Capstone2 | Dashboard</title>
</head>
<body>
        <div class="header">
                <div class="logo">
                        <a href="<?php echo BASE_URL .'admin/dashboard.php' ?>">
                                <h1>Capstone2 - Admin Page</h1>
                        </a>
                </div>
                <?php if (isset($_SESSION['user'])): ?>
                        <div class="user-info">
                                <span><?php echo $_SESSION['user']['username'] ?></span> &nbsp; &nbsp;
                                <a href="<?php echo BASE_URL . '/logout.php'; ?>" class="logout-btn">logout</a>
                        </div>
                <?php endif ?>
        </div>
        <div class="container dashboard">
                <h1>Welcome</h1>
                <div class="stats">



                </div>
                <br><br><br>
                <div class="buttons">
                        <a href="users.php">Add Users</a>

                </div>
        </div>
</body>
</html>
