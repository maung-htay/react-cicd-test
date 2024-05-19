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


type intialFormState = {
    username: string,
    password1: string,
    email: string,
    password2: string
}

type errorState = {
    username: string,
    email: string,
    non_field_errors?: string,
    password1?: string
    password2?: string
}

const SignUp = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState<intialFormState>({
        username: "",
        password1: "",
        email: "",
        password2: ""
    })
    const [error, setError] = useState<errorState>({
        username: "",
        email: "",
        non_field_errors: "",
        password1: "",
        password2: ""
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
        const response = await fetch('http://localhost:8000/api/v1/dj-rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await response.json();
        console.log(data)
        console.log(response)
        if (response.status === 400) {
            setError({
                username: "",
                email: "",
                non_field_errors: "",
                password1: "",
                password2: ""
            })
            for (const key in data) {
                setError(prevError => ({
                    ...prevError,
                    [key]: data[key][0]
                }));
            }
            console.log(error)
            return
        }


        if (response.ok) {
            navigate('/login')
        }

    }

    return (
        <div className="flex items-center justify-center pt-10">
            <form onSubmit={handleSubmit}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>SignUp</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="grid items-center w-full gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">User Name</Label>
                                <Input id="name" placeholder="User Name" name="username" value={form.username} onChange={handleChange} />
                                {error.username && <Label className="text-red-500">{error.username}</Label>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
                                {error.email && <Label className="text-red-500">{error.email}</Label>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password1">Password</Label>
                                <Input type="password" id="password1" placeholder="Password" name="password1" value={form.password1} onChange={handleChange} />
                                {error.password1 && <Label className="text-red-500">{error.password1}</Label>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password2">Confirm Password</Label>
                                <Input type="password" id="password2" placeholder="Comfirm Password" name="password2" value={form.password2} onChange={handleChange} />
                                {error.password2 && <Label className="text-red-500">{error.password2}</Label>}
                                {error.non_field_errors && <Label className="text-red-500">{error.non_field_errors}</Label>}
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-end">
                        {/* <NavLink to="/signup" className="text-blue-500"></NavLink> */}
                        <Button type="submit">Register</Button>
                    </CardFooter>
                </Card>
            </form>

        </div>
    )

}

export default SignUp;