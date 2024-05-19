
import { NavLink, useLoaderData, useNavigate } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAppSelector } from "@/store/hooks"
import { useState, useEffect } from "react"


type postDataType = {
    title: string,
    content: string,
    id: number,
    created_at: string,
    updated_at: string,
}



const Posts = () => {
    const [postData, setPostData] = useState<postDataType[]>([]);
    const token = useAppSelector((state) => state.login.access);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/api/v1/post/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (response.status === 401) {
                navigate('/login');

            }

            setPostData(data);
        };

        fetchData();
    }, []); //

    return (
        <div className="flex items-center justify-center pt-10">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Post</CardTitle>
                </CardHeader>
                <CardContent>

                    <CardDescription>
                        Posts Data
                    </CardDescription>
                    {postData && postData.map((post: postDataType) => (
                        <div key={post.id} className="p-2 my-2 border">
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                        </div>
                    ))}

                </CardContent>
                {/* <CardFooter className="flex justify-between">
                    <NavLink to="/signup" className="text-blue-500">SingUp</NavLink>
                    <Button type="submit">Login</Button>
                </CardFooter> */}
            </Card>
        </div>
    )
}
export default Posts;

