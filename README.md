# Login Flow

1. **User visits the Login page.**
2. **User enters their email and password.**
3. **User can optionally check the "Remember Me" box:**
    - If checked, authentication data (JWT and user info) is stored in `localStorage` (persists across browser restarts).
    - If not checked, authentication data is stored in `sessionStorage` (cleared when the browser/tab is closed).
4. **On successful login:**
    - The backend returns a JWT and user data.
    - The frontend stores the JWT and user data in the appropriate storage.
    - The user is redirected to the home/dashboard page.
5. **On app load:**
    - The app checks both `localStorage` and `sessionStorage` for authentication data and loads it into Pinia stores.
    - If valid, the user remains logged in.
6. **On logout:**
    - Both JWT and user data are cleared from all storage and Pinia stores.
    - The user is redirected to the login page.

**Security Note:**

- All sensitive validation and authentication logic is also enforced on the backend.
- CORS and HTTPS should be configured for production.

---

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Project Setup

This project uses Vue 3, Vite, Pinia, Vue Router, Vuetify, Axios, VueUse, Lodash, ESLint, and Vitest.

### Install dependencies

```sh
npm install
```

### Start the development server

```sh
npm run dev
```

### Run tests

```sh
npm run test
```
