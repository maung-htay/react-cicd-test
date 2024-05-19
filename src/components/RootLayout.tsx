import MainNavigation from "@/components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
    return (
        <div>
            <MainNavigation />
             <main>
                 <Outlet />
             </main>
        </div>
    );
}
export default RootLayout;