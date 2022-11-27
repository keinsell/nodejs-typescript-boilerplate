import { nanoid } from "nanoid";

/**
 * Entities are pretty much the bread and butter of domain modeling.
 *
 * They are the objects that represent the data that is being manipulated by the application.
 *
 * @version 1.0.0
 * @author Jakub "keinsell" Olan <keinsell@protonmail.com>
 * @see [Understanding Domain Entities](https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/)
 */
export abstract class Entity {
	/** Automatically generated (or imported) id of specific entity. Used to reference right object in persistence layer. */
	id: any;
	constructor(id?: any) {
		this.id = id ?? nanoid();
	}

	toJSON() {
		const jsoned = {};
		const toConvert = proto || this;
		Object.getOwnPropertyNames(toConvert).forEach((prop) => {
			const val = toConvert[prop];
			// don't include those
			if (prop === "toJSON" || prop === "constructor") {
				return;
			}
			if (typeof val === "function") {
				jsoned[prop] = val.bind(jsoned);
				return;
			}
			jsoned[prop] = val;
		});

		const inherited = Object.getPrototypeOf(toConvert);
		if (inherited !== null) {
			Object.keys(this.toJSON(inherited)).forEach((key) => {
				if (
					!!jsoned[key] ||
					key === "constructor" ||
					key === "toJSON"
				) {
					return;
				}
				if (typeof inherited[key] === "function") {
					jsoned[key] = inherited[key].bind(jsoned);
					return;
				}
				jsoned[key] = inherited[key];
			});
		}
		return jsoned;
	}
}
