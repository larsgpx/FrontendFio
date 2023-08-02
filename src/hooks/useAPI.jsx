import { useState } from 'react';

const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const postData = async (url, data) => {
    setLoading(true);

    try {
      const urlFetch = process.env.NEXT_PUBLIC_BASEURL + url;
      const response = await fetch(urlFetch, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setLoading(false);
        return result;
      } else {
        const result = await response.json();
        setLoading(false);
        return result;
        // throw new Error('Error en la solicitud POST');
      }
    } catch (errorData) {
      setLoading(false);
      setErrorData(errorData.message);
      throw errorData;
    }
  };

  return { loading, errorData, postData };
};

export default useAPI;
