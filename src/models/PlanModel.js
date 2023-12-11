export default function plan(planId, planData) {
  planId = planId ?? "";
  planData = planData ?? {};

  return {
    planId: planId ?? "",
    posterId: planData.posterId ?? "",
    posterName: planData.posterName ?? "",
    posterPhotoURL: planData.posterPhotoURL ?? "",
    gymId: planData.gymId ?? "",
    gymName: planData.gymName ?? "",
    arrivalTime: planData.arrivalTime ?? "",
    date: planData.date ?? "",
    duration: planData.duration ?? 0,
  }
}
