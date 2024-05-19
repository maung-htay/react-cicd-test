import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { login } from "@/store/login-info"

type intialFormState = {
    username: string,
    password: string
}
type errorState = {
    username?: string,
    non_field_errors?: string,
    password?: string,
    detail?: string
}

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState<intialFormState>({
        username: "",
        password: ""
    })
    const [error, setError] = useState<errorState>({
        username: "",
        non_field_errors: "",
        password: "",
        detail: ""
    })
    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form)
        // api/token/
        // api/v1/dj-rest-auth/login/
        const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await response.json();

        console.log(response)

        console.log(data)
        if (response.status === 400) {

            setError({
                username: "",
                non_field_errors: "",
                password: "",
                detail: ""
            })


            for (const key in data) {
                setError(prevError => ({
                    ...prevError,
                    [key]: data[key][0]
                }));
            }

        }
        if (response.status === 401) {
            setError({
                username: "",
                non_field_errors: "",
                password: "",
                detail: "Invalid Credentials"
            })

            console.log(data["detail"])

            if (data.detail !== undefined) {
                setError({
                    ...error,
                    detail: data.detail
                })
            }
        }


        if (response.ok) {
            console.log(data)
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            dispatch(login({ access: data.access, refresh: data.refresh }))
            navigate('/')
        }

    }

    return (
        <div className="flex items-center justify-center pt-10">
            <form onSubmit={handleSubmit}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="grid items-center w-full gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">User Name</Label>
                                <Input id="name" placeholder="User Name" name="username" value={form.username} onChange={handleChange} />
                                {error.username && <label className="text-red-500">{error.username}</label>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
                                {error.password && <label className="text-red-500">{error.password}</label>}
                                {error.non_field_errors && <label className="text-red-500">{error.non_field_errors}</label>}
                                {error.detail && <label className="text-red-500">{error.detail}</label>}
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <NavLink to="/signup" className="text-blue-500">SingUp</NavLink>
                        <Button type="submit">Login</Button>
                    </CardFooter>
                </Card>
            </form>

        </div>
    )
}
export default Login;