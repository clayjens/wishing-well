import { getWishlist } from "~/server/queries";

export default async function WishlistModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const wishlistId = Number(id);
  if (Number.isNaN(wishlistId)) throw new Error("Invalid wishlist ID");
  const wishlist = await getWishlist(wishlistId);

  return <div>{JSON.stringify(wishlist)}</div>;
}
