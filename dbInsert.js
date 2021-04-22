const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "interoperability",
  password: "postgres",
  port: 5432,
});
client.connect();

const selectOne = async () => {
  await client.query("delete from inventory");
  await client.query("delete from player");
  await client.query("delete from account");
  await client.query("delete from item");
  await client.query("delete from weapon");
  await client.query("delete from material");
  await client.query("delete from location");
  for (let i = 0; i < 30; ++i) {
    const smallint = i % 32000;
    console.log("inserting index", i);
    const email = i + "@web.at";
    const nickname = "player" + i;
    const xmlAccount = `<account><nickname>${nickname}</nickname><email>${email}</email><details><gender>male</gender></details></account>`;
    const playerSkills = { fishing: 5 };
    const xmlPlayer = `<player><nickname>${nickname}</nickname><email>${email}</email><details><skills>${playerSkills}</skills></details></player>`;
    const xmlInventory = `<inventory><color>black</color><size>${smallint}</size><details><user>${nickname}</user></details></inventory>`;
    const inventoryContent = { fishes: i };
    const inventoryName = "inventory" + i;
    const weaponName = "weapon" + i;
    const itemName = "item" + i;
    const materialName = "material" + i;
    const geoLocation = `(${i}, ${i + 1})`;
    const playerItemLocation = `(${i % 5}, ${(i % 5) + 1})`;
    await client.query(
      "insert into account values ($1, 22, NOW(), NOW(), $2, 'asdfassdf', 'bob')",
      [email, xmlAccount]
    );
    await client.query(
      "insert into location values ($1, 'mediterranean', 'friendly', 'hot', 200, 'zulu')",
      [geoLocation]
    );
    await client.query(
      "insert into player values ($1, $2, 10, $3, 'black', 52, $4, 'male', $5)",
      [email, nickname, xmlPlayer, playerSkills, playerItemLocation]
    );
    await client.query("insert into inventory values ($1, $2, $3, 10, 'black', 52, $4, $5)", [
      nickname,
      inventoryName,
      email,
      xmlInventory,
      inventoryContent,
    ]);
    await client.query("insert into weapon values ($1, $2, $3, $4, 100, 200)", [
      weaponName,
      i,
      smallint + 1,
      smallint,
    ]);
    await client.query("insert into material values ($1, $2, 'good', $3, $4, 'blue')", [
      materialName,
      i - 0.25,
      i - 0.5,
      i - 0.75,
    ]);
    await client.query("insert into item values ($1, 'someitem', $5, $2, $3, $4, 'cooking')", [
      itemName,
      materialName,
      i - 0.3 * i,
      smallint,
      playerItemLocation,
    ]);
  }
  //   const accounts = await client.query("select * from account");
  //   const players = await client.query("select * from player");
  //   const inventory = await client.query("select * from inventory");
  //   const weapons = await client.query("select * from weapon");
  //   const items = await client.query("select * from item");
  //   const material = await client.query("select * from material");
  //   const locations = await client.query("select * from location");
  //   console.log(accounts.rows); // Hello world!
  //   console.log(players.rows); // Hello world!
  //   console.log(inventory.rows); // Hello world!
  //   console.log(items.rows); // Hello world!
  //   console.log(weapons.rows); // Hello world!
  await client.end();
};

selectOne();
