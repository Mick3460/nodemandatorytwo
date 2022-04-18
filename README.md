# nodemandatorytwo

The project uses mysql2, so setting up the DB requires you to change the .env file to match your own connection to your mysql shell.
navigate to server/database and run the createMySQLConnection and createMySQLSchema javascript files.
A new user is created with the email "min@email.dk" and password "lol" for testing purposes.

web framework used: Svelte
database: mysql2
Nodemailer used when you register as a new user and when you buy items. (Currently just sending emails to my kea mail for testing purposes)
svelte-toastr used to make a notification when purchasing everything from the cart.

Bcrypt is used to store hashed passwords in databases and used to check when signing in.
express session is used to track a sessionID and pass it to the frontend to verify it's the same user when updating their profile.

In the frontend, login and profile are mutually exclusive, and they are protected with private routes from the given link (PrivateRouteGuard)



