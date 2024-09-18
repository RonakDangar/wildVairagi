import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  // Determine the number of days from the search parameter or default to 7 days
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  // Calculate the query date by subtracting the number of days from today
  const queryDate = subDays(new Date(), numDays).toISOString();

  // Use useQuery to fetch stays data from the API
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });
  
  // Filter stays to include only those with status 'checked-in' or 'checked-out'
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  // Return the loading state, fetched stays, confirmed stays, and the number of days
  return { isLoading, stays, confirmedStays, numDays };
}
