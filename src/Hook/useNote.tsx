import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "./useAxios";



const useNote = () => {
    const axiosSecure = AxiosSecure();
    const { data: note = [], refetch } = useQuery({
        queryKey: ['note'],
        queryFn: async () => {
            const res = await axiosSecure.get('/note');
            return res.data;
        }
    })
    return [note, refetch];
};

export default useNote;