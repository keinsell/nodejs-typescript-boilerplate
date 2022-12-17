import test from "ava";
import { UserRepository } from "../../repository";

test("Should decode user profile", async (t) => {
	t.pass();
});

test.todo("Should decode user profile from valid JWT token");
test.todo("Should not decode user profile from invalid JWT token");
test.todo(
	"Should decode and throw from valid JWT with missing User in our database"
);
