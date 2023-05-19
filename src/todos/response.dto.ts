import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Exclude({ toPlainOnly: true })
  _id: any;

  @Expose({ name: 'userId' })
  userId() {
    return this._id;
  }

  username: string;
  constructor(private readonly user: Partial<UserResponseDto>) {
    Object.assign((this, user));
  }
}
