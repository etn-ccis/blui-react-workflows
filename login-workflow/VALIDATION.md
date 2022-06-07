# Validation Steps

### Manual Steps

#### Authentication
1. User can log into the app using an email & password.
2. User can toggle show/hide password fields.
3. Correct console output appears when logging in.
4. User can log out of the app.
5. If 'Remember Me' is disabled, email is forgotten after logging out.

#### Account Creation
1. User cannot create an account until they enter a valid email.
2. User cannot create an account until they accept the EULA.
3. User cannot create an account until they enter First & Last Name.
4. Information is retained so that users can step backwards while creating an account.
5. Correct console output appears when validating a user-registration code.
6. Correct console output appears when creating an account.

#### Account Creation Via Invite
1. User cannot create an account until they accept the EULA.
2. User cannot create an account until they enter First & Last Name.
3. Information is retained so that users can step backwards while creating an account.
4. Correct console output appears when creating an account via invite.

#### Translations
1. User can toggle the spanish translation and all pages are converted to the appropriate language.
2. User can toggle the french translation.
3. User can toggle the chinese translation.
4. User can toggle the portuguese translation.

#### Change Password
1. Correct console output appears when requesting a reset password email.
2. Correct console output appears when changing password via reset email.
3. After a user changes their password, they are logged out of the application.


#### Misc.
1. User can cancel/close any sub-task (forgot password, forgot password email, invite register and create account).

### Unit Test Count
25
