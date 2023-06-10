import { kv } from "@vercel/kv";

export default async function count(request, response) {
  try {
    let count;

    if (request.method === "POST") {
      const incrementValue = Number(request.body.incrementValue);
      count = (await kv.get("count")) || 0;
      count += incrementValue;
      await kv.set("count", count);
    } else if (request.method === "GET") {
      count = (await kv.get("count")) || 0;
    } else {
      response.setHeader("Allow", ["GET", "POST"]);
      response.status(405).end(`Method ${request.method} Not Allowed`);
    }

    return response.status(200).json({ count });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
