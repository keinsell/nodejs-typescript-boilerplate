import { UserProfileDataTransferObject } from "../get-profile/response";

export interface LoginUserResponseDataTransferObject
	extends UserProfileDataTransferObject {
	token: string;
}
