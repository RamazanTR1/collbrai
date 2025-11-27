/**
 * Component Types - HARDCODED
 * Backend'den gelen component.type değerleri ile eşleşmeli
 *
 * Mevcut: 2 adet (24'e çıkacak)
 */

export const COMPONENT_TYPES = {
	// Mevcut Component Types (Backend'den alındı)
	COMPANIES: "Companies",
	HERO_ABOUT_US: "HeroAboutUs",
	HERO_FEATURES: "HeroFeatures",
	HERO_CHOOSE: "HeroChoose",
	HERO_HOW_IT_WORK: "HeroHowItWork",
	HERO_CTA: "HeroCTA",

	// TODO: Backend'de yeni component type'lar oluşturuldukça buraya eklenecek
} as const;

export type ComponentType =
	(typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];
