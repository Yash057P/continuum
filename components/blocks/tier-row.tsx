export default function TierRow({
	tier,
	children,
}: {
	tier: string;
	children: React.ReactNode;
}) {
	return (
		<div className="container flex border-b">
			<div className="right w-20 flex items-center justify-center border-r py-4">
				{tier}
			</div>
			<div className="left flex-1 flex items-center justify-start py-4 pl-4">
				{children}
			</div>
		</div>
	);
}
