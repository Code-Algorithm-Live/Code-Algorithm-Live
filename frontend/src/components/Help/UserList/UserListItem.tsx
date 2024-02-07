// 'use client';

// import { useMutation } from '@tanstack/react-query';
// import { loginUserA, helpDto } from '@/mock/';
// import { fetchSendHelp } from '@/api/match';
// import { Receiver } from '@/types/Help';

// const UserListItem = ({
//   roomUuid,
//   email,
//   image,
//   name,
// }: {
//   roomUuid: string;
//   email: string;
//   image: string;
//   name: string;
// }) => {
//   const sendHelpMutation = useMutation({
//     mutationFn: fetchSendHelp,
//     // eslint-disable-next-line no-console
//     onSuccess: result => console.log('data', result.data),
//   });

//   const handleClickRequestButton = ({ receiver }: { receiver: Receiver }) => {
//     if (sendHelpMutation.isPending) return;

//     const sender = {
//       email: loginUserA.email,
//       image: loginUserA.image,
//       name: loginUserA.name,
//     };

//     sendHelpMutation.mutate({
//       sender,
//       receiver,
//       helpDto,
//       roomUuid,
//     });
//   };

//   return (
//     <>
//       <div>{email}</div>
//       <div>{image}</div>
//       <div>{name}</div>
//       <button
//         style={{
//           padding: '12px 8px',
//           border: '1px solid',
//         }}
//         onClick={() =>
//           handleClickRequestButton({ receiver: { email, image, name } })
//         }
//       >
//         {sendHelpMutation.isPending && <>요청하는 중...</>}
//         {!sendHelpMutation.isPending && <>요청하기</>}
//       </button>
//     </>
//   );
// };

// export default UserListItem;
