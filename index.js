const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const orderRoutes = require("./routes/order.routes");
const db = require("./db");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
