/**
 * Page Types - Her type için FARKLI layout/tasarım
 *
 * Backend'den alınan gerçek PageType'lar
 * Her page type, farklı bir React layout component'i ile render edilecek.
 *
 * Kullanım: PageLayoutRenderer component'i bu type'lara göre layout seçer
 */

export const PAGE_TYPES = {
	// Mevcut Page Types
	HOMEPAGE: "Ana Sayfa",

	// TODO: Backend'de yeni page type'lar oluşturuldukça buraya eklenecek
} as const;

export type PageType = (typeof PAGE_TYPES)[keyof typeof PAGE_TYPES];

/**
 * Helper: Type string'ini PageType'a validate et
 */
export function isValidPageType(type: string): type is PageType {
	return Object.values(PAGE_TYPES).includes(type as PageType);
}

/**
 * Helper: API data fetching için kullanılan özel type'lar mı?
 * Bu type'lar özel veri çekme fonksiyonları ile kullanılıyor (slider, homepage content, vb.)
 */
export function isDataFetchingType(type: string): boolean {
	const fetchingTypes: PageType[] = [PAGE_TYPES.HOMEPAGE];
	return fetchingTypes.includes(type as PageType);
}
