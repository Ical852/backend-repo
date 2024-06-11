import express from "express";
import { json } from "body-parser";
import { userRoutes, authRoutes } from "../routes";
import { ErrorHandlerParams } from "../types";

const app = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Error Handler
app.use((params: ErrorHandlerParams) => {
  const { err, res } = params;
  if (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
