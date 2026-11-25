import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const urls = [
  ["DATABASE_URL", process.env.DATABASE_URL],
  ["DIRECT_URL", process.env.DIRECT_URL],
];

for (const [name, url] of urls) {
  if (!url) continue;
  console.log(`\n=== ${name} ===`);
  console.log(url.replace(/:[^:@/]+@/, ":****@"));
  const prisma = new PrismaClient({
    datasources: { db: { url } },
  });
  try {
    const rows = await prisma.$queryRaw`select 1 as ok`;
    console.log("OK", rows);
  } catch (e) {
    console.error("FAIL", e.code || "", String(e.message).replace(/\s+/g, " ").slice(0, 300));
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}
