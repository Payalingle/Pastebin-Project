import prisma from "../../../lib/prisma";
function getNow(req) {
  if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
    return new Date(Number(req.headers["x-test-now-ms"]));
  }
  return new Date();
}

export default async function handler(req, res) {
  const { id } = req.query;

  const paste = await prisma.paste.findUnique({ where: { id } });
  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: "Views exceeded" });
  }

  const updated = await prisma.paste.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  res.status(200).json({
    content: updated.content,
    remaining_views: updated.maxViews
      ? updated.maxViews - updated.views
      : null,
    expires_at: updated.expiresAt,
  });
}