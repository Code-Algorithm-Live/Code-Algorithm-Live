import Form from '@/components/Help/UserList';
import UserListItem from '@/components/Help/UserList/UserListItem';
import { loginUserB } from '@/mock';
import { generateUUID } from '@/utils/uuid';

const mockUser = [
  {
    email: loginUserB.email,
    image: loginUserB.image,
    name: loginUserB.name,
  },
];

const roomUuid = generateUUID();

export default function UserList() {
  return (
    <>
      <h1>UserList</h1>
      <div>
        {mockUser.map(user => (
          <UserListItem key={user.email} roomUuid={roomUuid} {...user} />
        ))}
      </div>
      <Form />
    </>
  );
}
