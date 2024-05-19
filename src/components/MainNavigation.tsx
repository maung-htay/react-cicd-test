import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/login-info";

const MainNavigation = () => {
    const dispatch = useAppDispatch();
    const login = useAppSelector((state) => state.login);
    console.log(login)
    return (
        <>
            <header className="px-10 py-3 bg-blue-500 h-14">
                <nav className="flex items-center justify-between">
                    <div className="flex gap-3">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? "text-white underline dark:text-black" : undefined
                        }>
                            Home
                        </NavLink>
                        {
                            login.access ? (
                                <NavLink to="/posts" className={({ isActive }) =>
                                    isActive ? "text-white underline dark:text-black" : undefined
                                }>
                                    Posts
                                </NavLink>
                            ) : null
                        }

                    </div>

                    <div className="flex gap-3">
                        {
                            login.access ? (
                                <NavLink to="" className=""
                                    onClick={() => {
                                        localStorage.removeItem('access');
                                        localStorage.removeItem('refresh');
                                        dispatch(logout());
                                    }}
                                >
                                    Logout
                                </NavLink>
                            ) : <NavLink to="/login" className={({ isActive }) =>
                                isActive ? "text-white underline dark:text-black" : undefined
                            }>
                                Login
                            </NavLink>
                        }



                    </div>

                </nav>
            </header>
        </>
    )
};
export default MainNavigation;