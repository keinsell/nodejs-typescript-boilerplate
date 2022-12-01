import { Request } from "@tinyhttp/app";
import { Guard } from "../../common/lib/domain/guard";
import { JsonWebTokenService } from "../../common/services/jsonwebtoken";

export class UserGuard extends Guard {}
