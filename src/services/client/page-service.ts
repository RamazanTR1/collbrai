import { Page } from "@/types/page.types";
import {
	PagesPaginatedRequest,
	PaginatedResponse,
} from "@/types/paginated-request.types";
import { fetchClient } from "@/utils/fetch-client";

export const getPageById = async (id: number) => {
	const page = await fetchClient<void, Page>(`/api/v1/public/pages/${id}`);
	return page as Page;
};

export const getPageBySlug = async (slug: string) => {
	const page = await fetchClient<void, Page>(
		`/api/v1/public/pages/slug/${slug}`
	);
	return page as Page;
};

export const getPages = async (request: PagesPaginatedRequest) => {
	// Use GET body -> query serialization supported by fetchClient
	const pages = await fetchClient<
		PagesPaginatedRequest,
		PaginatedResponse<Page>
	>("/public/pages", {
		method: "GET",
		body: request,
	});
	return pages as PaginatedResponse<Page>;
};
