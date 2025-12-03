"use client";

import { useRef } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";
import { ComponentWrapper } from "@/types/page.types";
import { getComponent } from "./component-registry";
import { ErrorBoundary } from "@/components/error-boundary";

interface ComponentRendererProps {
	componentWrapper: ComponentWrapper;
}

export function ComponentRenderer({
	componentWrapper,
}: ComponentRendererProps) {
	const { component } = componentWrapper;
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	// Sort assets by sortOrder before passing to component
	const sortedAssets = [...component.assets].sort(
		(a, b) => a.sortOrder - b.sortOrder
	);

	const props = {
		title: component.title || "",
		description: component.description || component.excerpt || "",
		assets: sortedAssets,
	};

	// Get component from registry
	const Component = getComponent(component.type);

	// Render component or fallback using React.createElement to avoid render-time component creation
	let ComponentToRender: React.ReactNode;
	if (Component) {
		ComponentToRender = React.createElement(Component, props);
	} else {
		// Fallback for unknown component types
		console.warn(`Unknown component type: ${component.type}`);
		ComponentToRender = (
			<div className=" text-center text-sm text-light-gray">
				<p>Component type &quot;{component.type}&quot; is not supported.</p>
			</div>
		);
	}

	return (
		<ErrorBoundary
			fallback={
				<div className="pb-48 text-center text-sm text-white/70">
					<p>Failed to load component. Please refresh the page.</p>
				</div>
			}
		>
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: 50 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="pb-48"
			>
				{ComponentToRender}
			</motion.div>
		</ErrorBoundary>
	);
}
