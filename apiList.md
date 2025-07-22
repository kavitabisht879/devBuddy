# DevTinder APIs

## autRouter
-POST /signup
-POST /login
-POST /logout

 ## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password   *forget password api *

## connectionRequestRouter
-POST /request/send/:status/:userId
-POST /request/review/:status/:requestId

## userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed - gets you the profile of other users on platform

status : ignore , intereasted , accepeted , rejected
