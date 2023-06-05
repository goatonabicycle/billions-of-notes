import { db } from "@vercel/postgres";

export default async function count(request, response) {
  const client = await db.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS NotesCount (
        ID SERIAL PRIMARY KEY,
        Count int NOT NULL DEFAULT 0
      );
    `);

    const { rowCount } = await client.query(`
      SELECT * FROM NotesCount WHERE ID = 1;
    `);

    if (rowCount === 0) {
      await client.query(`
        INSERT INTO NotesCount (ID, Count) VALUES (1, 0);
      `);
    }

    console.log(request.method);
    if (request.method === "POST") {
      const incrementValue = Number(request.body.incrementValue);
      await client.query(
        `UPDATE NotesCount SET Count = Count + $1 WHERE ID = 1;
      `,
        [incrementValue]
      );
      const { rows } = await client.query(`
        SELECT Count FROM NotesCount WHERE ID = 1;
      `);
      return response.status(200).json({ count: rows[0].count });
    } else if (request.method === "GET") {
      const { rows } = await client.query(`
        SELECT Count FROM NotesCount WHERE ID = 1;
      `);
      console.log({ rows });
      return response.status(200).json({ count: rows[0].count });
    } else {
      response.setHeader("Allow", ["GET", "POST"]);
      response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    return response.status(500).json({ error });
  } finally {
    client.release();
  }
}
