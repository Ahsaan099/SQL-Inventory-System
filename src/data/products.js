export const INITIAL_PRODUCTS = [
  { id: 1, name: 'MacBook Pro 14"', category: "Electronics", quantity: 23, price: 199999, sku: "MBP-001" },
  { id: 2, name: "Mechanical Keyboard", category: "Peripherals", quantity: 7, price: 8999, sku: "KBD-042" },
  { id: 3, name: '4K Monitor 27"', category: "Displays", quantity: 0, price: 45000, sku: "MON-007" },
  { id: 4, name: "USB-C Hub 7-in-1", category: "Accessories", quantity: 3, price: 2499, sku: "HUB-019" },
  { id: 5, name: "Wireless Mouse", category: "Peripherals", quantity: 15, price: 3299, sku: "MSE-033" },
  { id: 6, name: "SSD 1TB NVMe", category: "Storage", quantity: 8, price: 9500, sku: "SSD-088" },
  { id: 7, name: "Webcam 1080p", category: "Peripherals", quantity: 0, price: 5999, sku: "CAM-011" },
  { id: 8, name: "Laptop Stand Aluminum", category: "Accessories", quantity: 31, price: 1899, sku: "STD-055" },
];

export const CATEGORIES = ["Electronics","Peripherals","Displays","Accessories","Storage","Furniture","Other"];

export const SQL_QUERIES = {
  add: (p) => "INSERT INTO products (name, category, quantity, price, sku)\nVALUES ('" + p.name + "', '" + p.category + "', " + p.quantity + ", " + p.price + ", '" + p.sku + "');",
  delete: (id) => "DELETE FROM products\nWHERE id = " + id + ";",
  update: (p) => "UPDATE products\nSET name='" + p.name + "', category='" + p.category + "',\n    quantity=" + p.quantity + ", price=" + p.price + "\nWHERE id = " + p.id + ";",
  select: () => "SELECT id, sku, name, category,\n       quantity, price,\n       CASE\n         WHEN quantity = 0 THEN 'Out of Stock'\n         WHEN quantity < 10 THEN 'Low Stock'\n         ELSE 'In Stock'\n       END AS status\nFROM products\nORDER BY name ASC;",
};

export function getStatus(qty) {
  if (qty === 0) return "out";
  if (qty < 10) return "low";
  return "ok";
}
