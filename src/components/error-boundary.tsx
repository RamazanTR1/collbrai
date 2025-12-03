"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex min-h-screen flex-col items-center justify-center bg-black-almost px-4 text-white">
					<div className="max-w-md text-center">
						<AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
						<h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
						<p className="mb-6 text-white/70">
							{this.state.error?.message ||
								"An unexpected error occurred. Please try again."}
						</p>
						<div className="flex gap-4 justify-center">
							<Button
								onClick={this.handleReset}
								className="bg-light-green text-black hover:bg-light-green/90"
							>
								Try again
							</Button>
							<Button
								onClick={() => (window.location.href = "/")}
								variant="ghost"
								className="text-white hover:bg-white/10"
							>
								Go home
							</Button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

