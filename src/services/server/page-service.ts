"use server";

import { Page } from "@/types/page.types";
import {
	PagesPaginatedRequest,
	PaginatedResponse,
} from "@/types/paginated-request.types";
import { fetchServer } from "@/utils/fetch-server";

export const getPageById = async (id: number, locale?: string) => {
	const page = await fetchServer<void, Page>(`/api/v1/public/pages/${id}`, {
		locale,
	});
	return page as Page;
};

export const getPageBySlug = async (slug: string, locale?: string) => {
	const page = await fetchServer<void, Page>(
		`/api/v1/public/pages/slug/${slug}`,
		{
			locale,
		}
	);
	return page as Page;
};

export const getPages = async (request: PagesPaginatedRequest) => {
	// Use GET body -> query serialization supported by fetchServer
	const pages = await fetchServer<
		PagesPaginatedRequest,
		PaginatedResponse<Page>
	>("/public/pages", {
		method: "GET",
		body: request,
	});
	return pages as PaginatedResponse<Page>;
};

