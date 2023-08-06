export default function gymData(gymId, gymData, gymFav) {
  gymId = gymId ?? ""
  gymData = gymData ?? {};
  gymFav = gymFav ?? false;

  return {
    gymId: gymId ? gymId : "",
    displayName: gymData.displayName ? gymData.displayName : "",
    location: gymData.location ? gymData.location : "",
    phone: gymData.phone ? gymData.phone : "",
    address: gymData.address ? gymData.address : "",
    website: gymData.website ? gymData.website : "",
    favorite: gymFav ? gymFav : false,
  };
}
