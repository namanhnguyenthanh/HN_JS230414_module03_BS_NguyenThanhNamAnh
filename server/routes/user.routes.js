const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../ultils/database");

router.use(bodyParser.json());

// GET all
router.get("/", async (req, res) => {
  const query = "SELECT * FROM user";
  try {
    const users = await db.execute(query);
    res.json({ users: users[0][0] });
  } catch (error) {
    res.json({ error: error });
  }
});

// GET one
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM user WHERE id = ${id}`;
    const user = await db.execute(query);
    if (user[0].length > 0) {
      res.json({ user: user[0][0] });
    } else {
      res.json({ error: "user not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//POST
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  console.log(req.body);
  try {
    const query = `INSERT INTO user (name, email, age) VALUES ('${name}', '${email}', ${age})`;
    const result = await db.execute(query);
    if (result[0].affectedRows > 0) {
      res.json({ message: "create user success" });
    } else {
      res.json({ error: "create user failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  let { name, email, age } = req.body;
  try {
    let query = `UPDATE user SET name = '${name}', email = '${email}', age = ${age} WHERE id = ${id}`;
    const result = await db.execute(query);
    if (result[0].affectedRows > 0) {
      res.json({ message: "update user success" });
    } else {
      res.json({ error: "update user failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM user WHERE id = ${id}`;
    const result = await db.execute(query);
    if (result[0].affectedRows > 0) {
      res.json({ message: "user deleted" });
    } else {
      res.json({ error: "user not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
