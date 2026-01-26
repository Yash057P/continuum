"use client";

import { useRAWGGames } from "@/hooks/use-games";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Toolbar from "@/components/blocks/toolbar";
import TierRow from "@/components/blocks/tier-row";

export default function Home() {
	const { data, error, isLoading, isError } = useRAWGGames();

	const tiers = ["A", "B", "C", "D", "E", "F"];

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
					<p className="mt-4 text-lg font-medium">Loading games...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center max-w-md">
					<div className="text-red-500 text-6xl mb-4">⚠️</div>
					<h2 className="text-2xl font-bold mb-2">Error Loading Games</h2>
					<p className="text-gray-600 dark:text-gray-400">
						{error instanceof Error
							? error.message
							: "An unexpected error occurred"}
					</p>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mb-4 flex flex-col">
				<h1 className="text-4xl font-bold ">Continuum</h1>
				<p className="text-gray-600 dark:text-gray-400">your book for games</p>
			</div>

			<Separator className="mb-8" />
			<Toolbar />
			<div className="board bg-sidebar-accent rounded-2xl w-full min-h-[75dvh] grid">
				{tiers.map((tier) => (
					<TierRow tier={tier}>Hello</TierRow>
				))}
			</div>

			{/* <div className="mb-4">
				<p className="text-sm text-gray-500">
					Found {data?.count.toLocaleString()} games
				</p>
			</div> */}

			{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{data?.results.map((game) => (
					<Card
						key={game.id}
						className="overflow-hidden hover:shadow-lg transition-shadow"
					>
						{game.background_image && (
							<div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
								<img
									src={game.background_image}
									alt={game.name}
									className="w-full h-full object-cover hover:scale-105 transition-transform"
								/>
							</div>
						)}
						<CardHeader>
							<CardTitle className="line-clamp-1">{game.name}</CardTitle>
							<CardDescription className="flex items-center gap-2">
								<span>{game.released || "TBA"}</span>
								{game.rating > 0 && (
									<Badge variant="secondary">⭐ {game.rating.toFixed(1)}</Badge>
								)}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{game.genres && game.genres.length > 0 && (
								<div className="flex flex-wrap gap-1">
									{game.genres.slice(0, 3).map((genre) => (
										<Badge key={genre.id} variant="outline" className="text-xs">
											{genre.name}
										</Badge>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div> */}

			{/* {data?.next && (
				<div className="mt-8 text-center">
					<button
						className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						onClick={() => {
							// You can implement pagination here
							console.log("Load more...");
						}}
					>
						Load More
					</button>
				</div>
			)} */}
		</main>
	);
}
