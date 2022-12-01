import { UserProfileDataTransferObject } from "../get-profile/response";

export interface RegisterUserResponseDataTransferObject
	extends UserProfileDataTransferObject {
	token: string;
}
