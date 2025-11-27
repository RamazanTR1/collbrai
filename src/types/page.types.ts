export type Asset = {
	id: number;
	url: string;
	type: string;
	mime: string;
	width: number;
	height: number;
	title: string;
	description: string;
	subdescription: string;
};

export type ComponentAsset = {
	id: number;
	asset: Asset;
	sortOrder: number;
};

export type Component = {
	id: number;
	name: string;
	type: string;
	value: string;
	title: string;
	excerpt: string;
	description: string;
	assets: ComponentAsset[];
	link: string;
};

export type ComponentWrapper = {
	component: Component;
	sortOrder: number;
};

export type TeamMember = {
	id: number;
	name: string;
	linkedinUrl: string;
	email: string;
	photo: string;
	title: string;
	description: string;
};

export type TeamMemberWrapper = {
	teamMember: TeamMember;
	sortOrder: number;
};

export type FileData = {
	id: number;
	url: string;
	type: string;
	mime: string;
	width: number;
	height: number;
	title: string;
	description: string;
	subdescription: string;
};

export type Page = {
	id: number;
	slug: string;
	name: string;
	type: string;
	title: string;
	excerpt: string;
	content: string;
	metaTitle: string;
	metaDescription: string;
	metaKeywords: string;
	file: FileData;
	image: FileData;
	components: ComponentWrapper[];
	teamMembers: TeamMemberWrapper[];
};
