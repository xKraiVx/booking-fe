import type { UserRole } from "@/domain/users/schemas/user-role.schema";

export class TestingLoginService {
  async loginAsRole(role: UserRole) {
    return {
      authResponse: { access_token: "fake-token", expiresAt: "never" },
      user: { id: "1", email: `${role}@example.com`, role },
    };
  }
}
