import { Link } from './link';
import { Crop } from './crop';

export class Page {
	number: number;
	assetName: string;
	double: boolean;
	links: Array<Link>;
	crop: Crop;
}
