import { ComponentType, COMPONENT_TYPES } from "@/constants/component-types";
import { Companies } from "./companies";
import { HeroAboutUs } from "./hero-about-us";
import { HeroFeatures } from "./hero-features";
import { HeroChoose } from "./hero-choose";
import { HeroHowItWork } from "./hero-how-it-work";
import { HeroCTA } from "./hero-cta";
import { ComponentAsset } from "@/types/page.types";

export type ComponentProps = {
	title: string;
	description?: string;
	assets: ComponentAsset[];
};

// Type-safe registry: All ComponentType keys must be present
const registry: Record<ComponentType, React.ComponentType<ComponentProps>> = {
	[COMPONENT_TYPES.COMPANIES]: Companies,
	[COMPONENT_TYPES.HERO_ABOUT_US]: HeroAboutUs,
	[COMPONENT_TYPES.HERO_FEATURES]: HeroFeatures,
	[COMPONENT_TYPES.HERO_CHOOSE]: HeroChoose,
	[COMPONENT_TYPES.HERO_HOW_IT_WORK]: HeroHowItWork,
	[COMPONENT_TYPES.HERO_CTA]: HeroCTA,
};

/**
 * Get a component from the registry by its type
 * @param type - The component type string from backend
 * @returns The React component or null if not found
 */
export function getComponent(
	type: string
): React.ComponentType<ComponentProps> | null {
	const component = registry[type as ComponentType];
	return component || null;
}
