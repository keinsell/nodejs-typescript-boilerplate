import { Request } from "@tinyhttp/app";
import { Guard } from "../../common/lib/domain/guard";
import { JsonWebTokenService } from "../../common/lib/security/jsonwebtoken";

export class UserGuard extends Guard {}
