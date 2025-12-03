import {
	NotificationSubscriberResponse,
	NotificationSubscriberRequest,
} from "@/types/notification-subscribers.types";
import { fetchClient } from "@/utils/fetch-client";

export const subscribeToNotifications = (
	subscriberRequest: NotificationSubscriberRequest
) => {
	return fetchClient<
		NotificationSubscriberRequest,
		NotificationSubscriberResponse
	>("/api/v1/notification-subscribers", {
		method: "POST",
		body: subscriberRequest,
	});
};
