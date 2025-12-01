import { Settings } from "@/types/settings.types";
import { fetchServer } from "@/utils/fetch-server";

export const getSettings = async (): Promise<Settings> => {
	return fetchServer<void, Settings>("/api/v1/public/settings", {
		method: "GET",
	});
};

