import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getCurrentUser(userId: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        subscription_tier: string;
        created_at: Date;
        last_login_at: Date | null;
        email_verified: boolean;
    }>;
    updateCurrentUser(userId: string, updateData: UpdateUserDto): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        subscription_tier: string;
        updated_at: Date;
    }>;
}
