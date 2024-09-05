export default function WishlistModal({
  params: { id: wishlistId },
}: {
  params: { id: string };
}) {
  return <div>{wishlistId}</div>;
}
