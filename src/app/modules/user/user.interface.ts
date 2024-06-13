import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type IUserRole = keyof typeof USER_ROLE;

export interface IUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    status: 'in-progress' | 'block';
    role: IUserRole;
    isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
    comparePassword(plain: string, hashed: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChange(
        jwtIssuedAt: number,
        passwordChangedAt: Date,
    ): boolean;
}
