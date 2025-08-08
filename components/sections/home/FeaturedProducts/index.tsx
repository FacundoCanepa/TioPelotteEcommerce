import { flagNuevoCarrusel } from "@/lib/flags";
import FeaturedV1 from "../FeaturedV1";
import FeaturedV2 from "./FeaturedV2";

export default async function FeaturedProductsSection() {
  const useNew = await flagNuevoCarrusel();
  return useNew ? <FeaturedV2 /> : <FeaturedV1 />;
}