import "server-only";
import { db } from "./db";
// import { auth } from '@clerk/nextjs/server';

export async function getUserWishlists() {
  // const user = auth();

  // if (!userAgent.userId) throw new Error("Unauthorized");

  const wishlists = await db.query.wishlists.findMany({
    // where: (model, { eq } => eq(model.userId, user.userId))
    orderBy: (model, { desc }) => desc(model.id),
  });

  return wishlists;
}

export async function getWishlist(id: number) {
  // const user = auth();

  //   if (!user.userId) throw new Error("Unauthorized");

  const wishlist = await db.query.wishlists.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!wishlist) throw new Error("Wishlist not found");

  //   if (wishlist.userId !== user.userId) throw new Error("Unauthorized");

  return wishlist;
}
