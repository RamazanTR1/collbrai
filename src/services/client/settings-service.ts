import { Settings } from "@/types/settings.types";
import { fetchClient } from "@/utils/fetch-client";

export const getSettings = async (): Promise<Settings> => {
	return fetchClient<void, Settings>("/api/v1/public/settings", {
		method: "GET",
	});
};
