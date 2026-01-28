import prisma from "../../../lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds && ttl_seconds < 1) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views && max_views < 1) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const id = nanoid(8);

  let expiresAt = null;
  if (ttl_seconds) {
    expiresAt = new Date(Date.now() + ttl_seconds * 1000);
  }

  await prisma.paste.create({
    data: {
      id,
      content,
      expiresAt,
      maxViews: max_views || null,
    },
  });

  res.status(200).json({
    id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`,
  });
}