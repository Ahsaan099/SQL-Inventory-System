InvenTrack Pro | SQL-Simulated Inventory Management
A professional inventory management dashboard designed with React and Tailwind CSS. This system implements a simulated SQL engine that bridges the gap between frontend actions and database logic, providing a comprehensive visualization of stock operations.

Key Features
SQL Visualization Engine
Every operation including adding, editing, or deleting products automatically generates the corresponding SQL query. This allows for a clear understanding of how the frontend interacts with a relational database.

Dynamic Inventory Monitoring
The dashboard tracks vital metrics such as total product count, low stock warnings, and the total monetary value of the current inventory.

Intelligent Stock Indicators
The system categorizes products based on quantity levels. Items with zero quantity are flagged as Out of Stock, while those below ten units are categorized as Low Stock to trigger re-order alerts.

Advanced User Interface
A custom HTML5 Canvas cursor trail provides a smooth navigation experience. The interface uses pure CSS keyframe animations for staggered row entrances and modal transitions, ensuring a lightweight and responsive application.

Tech Stack
Frontend: React via Vite
Styling: Tailwind CSS
Icons: Lucide-React
Animation: Native CSS Keyframes and HTML5 Canvas
Database Logic: JavaScript-based SQL Simulation

Project Structure
src/components: Contains modular UI elements like tables, modals, and stat cards.
src/data: Holds the core logic for SQL query generation and initial datasets.
src/App.jsx: The central hub managing application state and business logic.

Installation and Setup
Clone the repository to your local machine.

Run npm install to set up all necessary dependencies.

Use npm run dev to start the local development server.

Execute npm run build for production-ready deployment.

Example SQL Generation
The engine produces standard SQL syntax for all operations:

Insert: INSERT INTO products (name, category, quantity, price, sku) VALUES (...);

Update: UPDATE products SET quantity = 15 WHERE id = 5;

Delete: DELETE FROM products WHERE id = 2;
