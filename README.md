# Gymgoer
### Problemstosolve:
There are two types of users on the app , one is the normal 
‘user’ other is the ‘owner’ .Normal users can come to the 
platform and register them selves by using social login or
by providing the required information (as shown in the des
igns) .Fortheowner ,there is no registration flow as all 
the owners are already on boarded and stored in the DB

### Tech Stack Used:
1. Mongo DB
2. Node Js
3. React js
4. Express Js

### Normal User flow : 
Once the user register in the application (they can log in
too if already registered).After that they should see google
Maps and locate themselves, also there should be a search bar
in google Maps to manually provide their own location. Once 
the user provieds their location, it should be stored in the
DB and the 'profile view' of the user should open. In the 
profile view, the user should have a dummy photo, a unique 
QR code for this user and a unique referral code, and a list
of places where their QR code was scanned,  or a user code was given.

### Owner Flow:
Once the user login (there is no register flow for such a user
,store some dummy owners  with the details mentioned below).After 
login, the user will see an option to type the user code of 'normal
user' and a camera to scan the QR code of 'normal user'.Once the
QR code is scanned or the user code is punched

### Dummy data for the Owner:
`[{userid:'testuser',password:'test@123'}]
[{userid:'dummyuser',password:'test@321}]`

### Problem Solved
1. Social login + Normal email login
2. Google Maps API integration 
3. Unique QR code gerneration 
4. List the place where QR is scanned, or a user code is given 
5.Unique refferal code generation 
6. Overall CSS handling: this includes how similar the app is 
   looking to the designs given
