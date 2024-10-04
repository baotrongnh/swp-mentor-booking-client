import { useEffect, useState } from "react"

const useFetch = (fetchFuntion, params) => {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState('');

     useEffect(() => {
          const fetchData = async () => {
               setLoading(true);

               try {
                    const res = await fetchFuntion(params);
                    console.log(res);
                    setData(res.data);
               } catch (error) {
                    setError(error);
               } finally {
                    setLoading(false);
               }
          }

          fetchData();
     }, [fetchFuntion, params]);

     return { data, loading, error }
}

export default useFetch;