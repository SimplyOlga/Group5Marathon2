# Self-Assessment: Frontend Authentication

### Example 1: Creating the Sign Up and Login Pages

One of the frontend features we implemented was the authentication flow. We created both the **Sign Up** and **Login** pages from scratch and connected their forms to the backend authentication endpoints.

For example, the login form collects the user's credentials and sends them to the backend:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    // Store authentication information
  }
};
```

This allowed the frontend form to communicate with the backend instead of only displaying a static login page.

### Key Improvements:

* Built the Login page from scratch.
* Built the Sign Up page from scratch.
* Added form state and submission handling.
* Connected the forms to the backend authentication API.
* Added navigation between the authentication pages and the rest of the application.

---

### Example 2: Using the Authentication Token

After a successful login, we used the authentication token returned by the backend to keep track of the user's authentication state.

A simplified example of this logic is:

```jsx
const token = localStorage.getItem("token");

const isAuthenticated = !!token;
```

The `isAuthenticated` value can then be used throughout the frontend to determine whether the user is logged in.

We also used the token when making authenticated requests:

```jsx
const token = localStorage.getItem("token");

fetch(`${API_URL}/...`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

This connected the user's login state with the requests made by the frontend.

### Key Improvements:

* Implemented token storage on the frontend.
* Created an `isAuthenticated` check.
* Used the token for authenticated requests.
* Connected the authentication state with the rest of the application.

---

### Example 3: Conditional UI Based on Authentication

We used `isAuthenticated` to conditionally display parts of the user interface.

For example, the navigation can show different options depending on whether the user is logged in:

```jsx
{isAuthenticated ? (
  <>
    <Link to="/profile">Profile</Link>
    <button onClick={handleLogout}>Log out</button>
  </>
) : (
  <>
    <Link to="/login">Log in</Link>
    <Link to="/signup">Sign up</Link>
  </>
)}
```

This means that the frontend does not show the same authentication-related controls to every user. The UI changes according to the current authentication state.

### Key Improvements:

* Added conditional rendering based on `isAuthenticated`.
* Displayed different navigation options for logged-in and logged-out users.
* Connected the authentication state to the visible frontend UI.
* Made the application more responsive to the user's current state.

---

### Example 4: Routing the Authentication Pages

We also connected the authentication pages to the frontend routing system. This allowed users to navigate directly to the Login and Sign Up pages and move between authentication and the main application.

For example:

```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
  {/* other application routes */}
</Routes>
```

After a successful login or registration, the user can then be redirected to the appropriate page:

```jsx
navigate("/");
```

This made the authentication pages part of the application's normal navigation flow rather than separate pages.

### Key Improvements:

* Added routes for Login and Sign Up.
* Connected authentication pages to the React routing system.
* Added navigation after authentication.
* Integrated authentication with the rest of the frontend application.

---

## What I Learned

Through this work, I learned how to implement an authentication flow on the frontend and connect it to a backend. Instead of only creating the visual Login and Sign Up pages, we connected the forms to the backend, handled authentication tokens, and used the authentication state throughout the application.

I also learned how `isAuthenticated` can be used to control both navigation and the UI. Routing was another important part of the implementation because users need to be able to move between the Login, Sign Up, and main application pages.

Overall, this work gave me practical experience with React authentication, API communication, token handling, conditional rendering, and frontend routing.