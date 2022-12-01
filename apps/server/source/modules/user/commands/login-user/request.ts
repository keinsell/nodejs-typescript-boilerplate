/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/require-property */

export interface LoginUserRequestDataTransferObject {
	/**
	 * The user's useranme.
	 *
	 * @example "johndoe"
	 * @maxLength 32
	 * @minLength 1
	 */
	username: string;
	/**
	 * The user's password
	 *
	 * @example "superDuperStrongPassword"
	 * @maxLength 128
	 * @minLength 6
	 */
	password: string;
}
