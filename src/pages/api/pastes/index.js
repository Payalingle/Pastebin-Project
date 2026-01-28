import prisma from "../../../lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  // ✅ Validation
  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return res.status(400).json({ error: "ttl_seconds must be >= 1" });
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return res.status(400).json({ error: "max_views must be >= 1" });
  }

  const id = nanoid(8);

  let expiresAt = null;
  if (ttl_seconds) {
    expiresAt = new Date(Date.now() + ttl_seconds * 1000);
  }

  const paste = await prisma.paste.create({
    data: {
      id,
      content,
      expiresAt,
      maxViews: max_views ?? null,
      views: 0,
    },
  });

  return res.status(200).json({
    id: paste.id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${paste.id}`,
  });
}