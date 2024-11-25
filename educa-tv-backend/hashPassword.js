const bcrypt = require('bcrypt');

const passwords = [
  { email: "corporacioneducatv@gmail.com", password: "educatv" },
  { email: "ahielsin@gmail.com", password: "1204" }
];

async function generateHashes() {
  for (const user of passwords) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(`Email: ${user.email}`);
    console.log(`Hashed Password: ${hashedPassword}`);
    console.log("---------------------------");
  }
}

generateHashes();
