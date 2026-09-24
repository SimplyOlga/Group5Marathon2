# Self-Assessment (Template)

## Example 1: Improving Signup Validation

Initially, our `signupUser` controller validated the email and password after creating the user account. This meant that invalid data could potentially reach the database before the validation checks were performed.

```javascript
const signupUser = async (req, res) => {
  const { name, email, password, phone_number, gender, date_of_birth, address } = req.body;

  try {
const user = await User.signup(name, email, password, phone_number, gender, date_of_birth, address);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password is too weak" });
    }

    const token = generateToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

The main issue was that `User.signup()` was executed before checking whether the email and password were valid. This could result in unnecessary database operations and potentially create an account before invalid input was rejected.

We improved the controller by moving the validation before the database operation:

```javascript
const signupUser = async (req, res) => {
  const { name, email, password, phone_number, gender, date_of_birth, address } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password is too weak" });
    }

    const user = await User.signup(name, email, password, phone_number, gender, date_of_birth, address);

    const token = generateToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### Key Improvements

- **Validation Order**: Input is now validated before attempting to create a database record.
- **Database Efficiency**: Invalid requests are rejected before unnecessary database operations occur.
- **Error Prevention**: Prevents invalid email addresses and weak passwords from reaching the signup process.
- **Separation of Responsibilities**: The controller first validates the request, then calls the model to create the user.

**Lesson Learned**: Validation should generally happen as early as possible in the request-handling process, before performing database operations or other actions that depend on valid input.

---

## Example 2: Improving User Data Security and Response Consistency

Initially, our authentication endpoints returned user information in different formats. Additionally, `getUser` returned the entire Mongoose user object directly:

```javascript
const getUser = async (req, res) => {
  try {
    const user = req.user;
    const userObject = await User.findById(user._id);

    res.status(200).json(userObject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

This approach could unintentionally expose fields that should remain private if additional fields were later added to the user model. It also made the API responses less consistent because the login endpoint manually selected individual fields while `getUser` returned the entire database object.

We improved the response by explicitly selecting the fields that should be returned:

```javascript
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
```

We also applied the same response structure to login:

```javascript
res.status(200).json({
  user: {
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    gender: user.gender,
    date_of_birth: user.date_of_birth,
    address: user.address
  },
  token
});
```

### Key Improvements

- **Security**: Explicitly prevents the password field from being returned by the API.
- **Controlled Responses**: Only fields intended for the frontend are exposed.
- **Consistency**: Login and user retrieval now follow a similar response structure.
- **Maintainability**: Explicitly defining returned fields reduces the risk of accidentally exposing newly added database fields.

**Lesson Learned**:

- API endpoints should explicitly control which user fields are returned rather than returning entire database documents.
- Consistent API response structures make frontend development and API integration easier.
- Sensitive information such as passwords should never be exposed through API responses.