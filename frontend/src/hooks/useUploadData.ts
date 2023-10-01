// import axios from 'axios';
// import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

// export default () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<null | string>(null);

//   const uploadData = async (endPoint: string, data: unknown) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const res = await axios.post(
//         import.meta.env.VITE_SERVER_URL + endPoint,
//         data
//       );
//       console.log('ax said', res);
//       setLoading(false);
//       setSuccess(res.data.student.name);
//     } catch (error) {
//       console.log(error);
//       setError(error.response.data.error);
//       setLoading(false);
//     }
//   };

//   return { loading, error, setError, uploadData, success };
// };

// export const useUploadData = () =>
export default () =>
  useMutation({
    mutationKey: ['upload data'],
  });
