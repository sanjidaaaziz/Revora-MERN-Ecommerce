# 🛒 Revora

**A Full-Featured MERN E-Commerce Platform**
This project is a robust and dynamic e-commerce application built with the MERN stack, offering a seamless shopping experience for users and a comprehensive, easy-to-manage admin dashboard for store management.

## Live Link

🔗

## ✨ Features

### 🎀 User Frontend:

- **🔒 Secure Authentication**: Secure login, registration, and profile management with JWT.
- **🛍️ Product Exploration**: Search and filter products easily.
- **🛒 Shopping Cart**: Add, update, and checkout items smoothly.
- **💳 Seamless Payments**: Stripe integration for secure transactions.
- **📦 Order Management**: View history, track deliveries, and manage returns.

### ⚙️ Admin Dashboard:

- **🛠️ Product Management**: Add, update, or delete products.
- **📂 Category Management**: Organize products into categories.
- **📑 Order Management**: View, process, and update orders efficiently.
- **👥 User Management**: Manage user accounts and access levels.

## 🛠️ Tech Stack

- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **Express.js**:Lightweight backend framework for building APIs and handling server logic.
- **React.js**: Modern JavaScript library for building dynamic and responsive user interfaces.
- **Node.js**: Backend runtime environment to execute JavaScript on the server side.
- **Stripe**: Integrated payment gateway to handle secure transactions.
- **JWT**: JSON Web Tokens for secure authentication and session management.

## 🗂️ Project Structure

```plaintext
/
|-- admin/            # React.js admin frontend code
|-- backend/          # Node.js backend code (Express.js)
|-- frontend/         # React.js frontend code
|-- .gitignore        # Files and folders to be ignored by Git
|-- README.md         # Project documentation
```

## 🤸 Getting Started

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/sanjidaaaziz/Revora-MERN-Ecommerce.git
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

<details>
<summary><code>/admin/.env</code></summary>

```env
VITE_BACKEND_URL = "http://localhost:4000"
```

</details>

<details>
<summary><code>/backend/.env</code></summary>

```env
MONGODB_URI =

CLOUDINARY_API_KEY =

CLOUDINARY_SECRET_KEY =

CLOUDINARY_CLOUD_NAME =

JWT_SECRET =

STRIPE_SECRET_KEY =

ADMIN_EMAIL = "admin@revora.com" #For testing only

ADMIN_PASSWORD = "admin@123" #For testing only

```

</details>

<details>
<summary><code>/frontend/.env</code></summary>

```env
VITE_BACKEND_URL = "http://localhost:4000"
```

</details>

Replace the placeholder values with your actual Appwrite credentials.

**Running the Project**

**Admin Dashboard Running On:**

```bash
cd admin
```

```bash
npm run dev
```

**Backend Running On:**

```bash
cd backend
```

```bash
npm run server
```

**Frontend Running On:**

```bash
cd frontend
```

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser to view the admin dashboard.

Open [http://localhost:400](http://localhost:400) in your browser to run the backend.

Open [http://localhost:5173](http://localhost:5173) in your browser to view the frontend project.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add your message'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request with a clear description of your changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
