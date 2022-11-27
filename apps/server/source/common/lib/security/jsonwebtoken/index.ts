import jwt from "jsonwebtoken";

export class JsonWebTokenService {
	protected readonly JWT_SECRET = "superDuperSecret";

	sign<T>(payload: T | any, options?: jwt.SignOptions): string {
		return jwt.sign(payload, this.JWT_SECRET, options);
	}

	verify<T>(token: string, options?: jwt.VerifyOptions): T | any {
		return jwt.verify(token, this.JWT_SECRET, options);
	}
}
