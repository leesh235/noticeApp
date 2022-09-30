import "./Home.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListAction } from "../../modules/action/list";
import { List } from "../../components/home/list/List";

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListAction());
    }, []);

    return <List />;
}
