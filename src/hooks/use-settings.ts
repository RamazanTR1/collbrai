import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/services/client/settings-service";

export const useSettings = () => {
	return useQuery({
		queryKey: ["settings"],
		queryFn: getSettings,
	});
};
