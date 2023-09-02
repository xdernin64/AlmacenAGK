
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaBoxes, FaShippingFast, FaUserAlt,FaBuilding } from 'react-icons/fa';
import { AiOutlineDropbox } from 'react-icons/ai';
import { Badge } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import StyleIcon from '@mui/icons-material/Style';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { NavSisra } from "./DeskMenu";
import { NavbarWithMegaMenu } from "./MobileMenu";

const MainMenu = () => {
    //get the local storage length and update the state

    return (
        <NavbarWithMegaMenu />
    );
}
export default MainMenu;