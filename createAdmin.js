const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Replace with your MongoDB Atlas connection URI
const uri = "mongodb+srv://parasstarkmarkup:DKvIzrVeJgR1nrwX@cluster0.cr8izeq.mongodb.net/student_portal?retryWrites=true&w=majority";

// Replace with your actual DB and collection name
const dbName = "student_portal";
const collectionName = "users";

async function createAdmin() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const users = db.collection(collectionName);

    const studentId = "ADMIN001";

    const existingAdmin = await users.findOne({ studentId });
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // Change password if needed

    const adminUser = {
      email: "admin@uttkarsh.edu",
      password: hashedPassword,
      studentId: studentId,
      course: "Administration",
      role: "admin",
      createdAt: new Date(),
      __v: 0,
      username: "Admin User"
    };

    const result = await users.insertOne(adminUser);
    console.log("Admin user created:", result.insertedId);
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    await client.close();
  }
}

createAdmin();
