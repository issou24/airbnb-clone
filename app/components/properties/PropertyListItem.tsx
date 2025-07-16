import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyProps> = ({
  property,
  markFavorite,
}) => {
  const router = useRouter();

  // fallback image si image mal formée ou vide
  const imageUrl =
    property.image_url && property.image_url.startsWith("http")
      ? property.image_url
      : "/beach_1.jpg";

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          src={imageUrl}
          sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
          className="hover:scale-110 object-cover transition h-full w-full"
          alt={property.title || "Property image"}
        />

        {markFavorite && (
          <FavoriteButton
            id={property.id}
            is_favorite={property.is_favorite}
            markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )}
      </div>

      <div className="mt-2">
        <p className="text-lg font-bold">{property.title}</p>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-500">
          <strong>${property.price_per_night}</strong> per night
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;
