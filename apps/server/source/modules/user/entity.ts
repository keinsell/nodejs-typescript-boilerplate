import { Entity } from "../../common/lib/domain/entity";
import { ValueObject } from "../../common/lib/domain/value-object";
import { JsonWebTokenService } from "../../common/services/jsonwebtoken";
// eslint-disable-next-line node/file-extension-in-import
import { APPLICATION_CONFIGURATION } from "../../configuration/general";

export class Password extends ValueObject<string> {
	protected hasher = APPLICATION_CONFIGURATION.hashing;
	constructor(value: string) {
		super(value);
	}

	public isHashed(): boolean {
		return this.hasher.isHashed(this._v);
	}

	public async hash(): Promise<Password> {
		// If password is currently hashed return the same password
		if (this.isHashed()) {
			return this;
		}

		// Hash the password
		const hashedPassword = await this.hasher.hash(this._v);
		return new Password(hashedPassword);
	}

	public async compare(incomingValue: string): Promise<boolean> {
		// If password is not hashed, hash it
		if (!this.isHashed()) {
			this._v = await this.hasher.hash(this._v);
		}
		// Compare the incoming value with the hashed password
		return this.hasher.verify(incomingValue, this._v);
	}
}

export interface UserProperties {
	firstName?: string;
	lastName?: string;
	username: string;
	password: Password;
	email: string;
	dateOfBirth?: Date;
	height?: number;
	weight?: number;
}

export class User extends Entity implements UserProperties {
	firstName?: string;
	lastName?: string;
	username: string;
	password: Password;
	email: string;
	constructor(properties: UserProperties, id?: string) {
		super(id);
		this.firstName = properties.firstName;
		this.lastName = properties.lastName;
		this.username = properties.username;
		this.password = properties.password;
		this.email = properties.email;
	}

	public async authenticate(password: string): Promise<string | undefined> {
		const isPasswordValid = await this.password.compare(password);

		if (!isPasswordValid) {
			return undefined;
		}

		const jwtService = new JsonWebTokenService();

		return jwtService.sign({ id: this.id, username: this.username });
	}
}
