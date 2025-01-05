import { Content } from "Context/UserContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const index = (props: { children: React.ReactNode }) => {
    const value = useContext(Content);
    const location = useLocation();
    if (value?.role === "") {
        return <Navigate to={"/authentication/signin"} replace state={{ from: location }} />
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default index;