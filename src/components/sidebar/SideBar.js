import "./SideBar.css";
import { Link } from "react-router-dom";

const sideList = [
    { name: "할일", path: "/" },
    { name: "메모", path: "/memo" },
];

export const SideBar = () => {
    return (
        <ul id="sideBar">
            {sideList.map((val, idx) => {
                return (
                    <li className="side_menu" key={idx}>
                        <Link to={`${val.path}`}>{val.name}</Link>
                    </li>
                );
            })}
        </ul>
    );
};
