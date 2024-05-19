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

import { Label } from "@/components/ui/label"
import React, { useState } from "react"



const Home = () => {
    return (
        <div className="flex items-center justify-center pt-10">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Home Page</CardTitle>
                </CardHeader>
                <CardContent>

                    <CardDescription>
                        Welcome to the Home Page
                    </CardDescription>
                    <Label> This is testing Home Page </Label>

                </CardContent>
                {/* <CardFooter className="flex justify-between">
                    <NavLink to="/signup" className="text-blue-500">SingUp</NavLink>
                    <Button type="submit">Login</Button>
                </CardFooter> */}
            </Card>
        </div>
    )
}
export default Home;