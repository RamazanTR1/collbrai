import { useMutation } from "@tanstack/react-query";
import { subscribeToNotifications } from "@/services/client/notification-subscribers-service";
import { NotificationSubscriberRequest } from "@/types/notification-subscribers.types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useSubscribeToNotifications = () => {
	const t = useTranslations("footer.notificationSubscribers");
	return useMutation({
		mutationFn: (subscriberRequest: NotificationSubscriberRequest) =>
			subscribeToNotifications(subscriberRequest),
		onSuccess: () => {
			toast.success(t("success"));
		},
		onError: () => {
			toast.error(t("error"));
		},
	});
};
