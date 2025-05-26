
interface Props{
    params: {
        id: string;
    };
}
export default async function UserProfilePage({ params }: Props) {
    const {id}=await params;
  return <div className="bg-gray-900 text-xl text-white font-bold flex justify-center h-screen items-center ">UserPage: <span className="p-2 bg-orange-500 rounded-lg font-bold text-black">{id}</span></div>;
}