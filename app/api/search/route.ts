import { all_dorms } from "@/lib/search";
import { Dorm, DormResult, HousingType } from "@/lib/types";

export async function GET() {
  return Response.json(all_dorms);
}
