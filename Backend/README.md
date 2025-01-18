# UBER Backend

## Models

### User Model
Defines the schema for user data, including methods for generating auth tokens and comparing passwords.

```javascript
// ...existing code...
const userSchema = new mongoose.Schema({
    // ...existing code...
});
userSchema.methods.generateAuthToken = function() {
    // ...existing code...
};
userSchema.methods.comparePassword = async function(password) {
    // ...existing code...
};
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
```

### Ride Model
Defines the schema for ride data, including references to user and captain.

```javascript
// ...existing code...
const rideSchema = new mongoose.Schema({
    // ...existing code...
});
module.exports = mongoose.model('ride', rideSchema);
```

### Captain Model
Defines the schema for captain data, including methods for generating auth tokens, comparing passwords, and hashing passwords.

```javascript
// ...existing code...
const captainSchema = new mongoose.Schema({
    // ...existing code...
});
captainSchema.methods.generateAuthToken = function() {
    // ...existing code...
};
captainSchema.methods.comparePassword = async function(password) {
    // ...existing code...
};
captainSchema.methods.hashPassword = async function(password) {
    // ...existing code...
};
const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;
```

### BlacklistToken Model
Defines the schema for blacklisted tokens to handle token invalidation.

```javascript
// ...existing code...
const blacklistTokenSchema = new mongoose.Schema({
    // ...existing code...
});
module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
```

## Middleware

### Auth Middleware
Handles user and captain authentication by verifying JWT tokens and checking for blacklisted tokens.

```javascript
// ...existing code...
module.exports.authUser = async(req, res, next) => {
    // ...existing code...
};
module.exports.authCaptain = async(req, res, next) => {
    // ...existing code...
};
```

## Controllers

### User Controller
Handles user registration, login, profile retrieval, and logout.

```javascript
// ...existing code...
module.exports.registerUser = async(req, res) => {
    // ...existing code...
};
module.exports.loginUser = async(req, res) => {
    // ...existing code...
};
module.exports.getUserProfile = async(req, res) => {
    // ...existing code...
};
module.exports.logoutUser = async(req, res) => {
    // ...existing code...
};
```

### Ride Controller
Handles ride creation.

```javascript
// ...existing code...
module.exports.createRide = async(req, res) => {
    // ...existing code...
};
```

### Map Controller
Handles map-related functionalities such as getting coordinates, distance, and autocomplete suggestions.

```javascript
// ...existing code...
module.exports.getCoordinates = async(req, res) => {
    // ...existing code...
};
module.exports.getDistanceTime = async(req, res) => {
    // ...existing code...
};
module.exports.getAutoCompleteSuggestions = async(req, res) => {
    // ...existing code...
};
```

### Captain Controller
Handles captain registration, login, profile retrieval, and logout.

```javascript
// ...existing code...
module.exports.registerCaptain = async(req, res) => {
    // ...existing code...
};
module.exports.loginCaptain = async(req, res) => {
    // ...existing code...
};
module.exports.getCaptainProfile = async(req, res) => {
    // ...existing code...
};
module.exports.logoutCaptain = async(req, res) => {
    // ...existing code...
};
```

## Database

### DB Connection
Handles the connection to the MongoDB database.

```javascript
// ...existing code...
function connectToDB() {
    // ...existing code...
}
module.exports = connectToDB;
