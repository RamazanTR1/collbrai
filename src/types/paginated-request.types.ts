// Shared pagination/sorting primitives
export type SortDirection = "ASC" | "DESC";
export type SortParam = `${string},${SortDirection}`;

export type PaginationParams = {
	page?: number; // zero-based page index
	size?: number; // page size
	sort?: SortParam | SortParam[]; // e.g. "createdAt,ASC"
};

export type PagesPaginatedRequest = PaginationParams & {
	search?: string;
	type?: string;
};

// Generic paginated response matching Spring-like Page<T>
export type PaginatedResponse<TItem> = {
	content: TItem[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number; // current page index (0-based)
	first?: boolean;
	last?: boolean;
	numberOfElements?: number;
	empty?: boolean;
};
