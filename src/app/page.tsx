import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  const wishlists = await db.query.wishlists.findMany({
    with: {
      products: true,
    },
  });

  return (
    <main>
      {wishlists.map((wishlist) => (
        <Link href={`/wishlist/${wishlist.id}`} key={wishlist.id}>
          <h3>{wishlist.name}</h3>
          <p>{wishlist.description}</p>
        </Link>
      ))}
    </main>
  );
}
