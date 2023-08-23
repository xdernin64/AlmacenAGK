
import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { logoutsupabase } from "../../../supabaseClient";

// profile menu component
const profileMenuItems = [
    {
        label: "Mi perfil",
        icon: UserCircleIcon,
        link: "/profile",

    },
    {
        label: "Editar perfil",
        icon: Cog6ToothIcon,
        link: "/profile",
    },

    {
        label: "Cerrar sesión",
        icon: PowerIcon,
        link: "/login",
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, link }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <NavLink to={link} key={label}
                            onClick={link === "/login" ? logoutsupabase : closeMenu}
                        >
                            <MenuItem

                                onClick={closeMenu}
                                className={`flex items-center gap-2 rounded ${isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                                    }`}
                            >
                                {React.createElement(icon, {
                                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : "text-blue-gray-600"
                                        }`,
                                    strokeWidth: 2,
                                })}
                                <Typography
                                    as="span"
                                    variant="small"
                                    className={`font-normal ${isLastItem ? "text-red-500" : "text-blue-gray-800"
                                        }`}
                                >
                                    {label}
                                </Typography>
                            </MenuItem></NavLink>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list menu
const navListMenuItems = [
    {
        title: "Asistencias",
        description:
            "Registra al personal que asiste a laborar en la empresa.",
        link: "/asistencia",
    },
    {
        title: "horas extras",
        description:
            "Registra las horas extras del personal que asiste a laborar en la empresa.",
        link: "/horas-extras",
    },
    {
        title: "Usuarios",
        description:
            "Revisa la lista de usuarios que tienen acceso al sistema",
        link: "/users",
    },
];
// nav list menu
const navListMenuItemsProps = [
    {
        title: "Zonas",
        description:
            "Registra las zonas de la empresa.",
        link: "/zones",
    },
    {
        title: "Areas",
        description:
            "Registra las areas de la empresa.",
        link: "/areas",
    },
    {
        title: "Sedes",
        description:
            "Define las sedes de la empresa en las que se labora.",
        link: "/locations",
    },
    {
        title: "Departamentos",
        description:
            "Registra los departamentos de la empresa.",
        link: "/departaments",
    },
    {
        title: "Sub-departamentos",
        description:
            "Registra los sub-departamentos de la empresa.",
        link: "/subdepartaments",
    },
    {
        title: "Ocupaciones",
        description:
            "Registra las ocupaciones de la empresa.",
        link: "/occupations",
    },
    {
        title: "Labores",
        description:
            "Registra las labores de la empresa.",
        link: "/works",
    },
    {
        title: "Centros de costo",
        description:
            "Registra los centros de costo de la empresa.",
        link: "/cecos",
    }
];
const navListMenuItemsdtprops = [
    {
        title: "Asignacion de sedes",
        description:
            "Asigna las sedes en las zonas de la empresa.",
        link: "/zone-location",
    },
    {
        title: "Asignacion de areas",
        description:
            "Asigna las areas en las Zonas de la empresa.",
        link: "/zone-area",
    },
    {
        title: "Asignacion de departamentos",
        description:
            "Asigna los departamentos en las areas de la empresa.",
        link: "/area-departament",
    },
    {
        title: "Asignacion de sub-departamentos",
        description:
    "Asigna los sub-departamentos en los departamentos de la empresa.",
        link: "/departament-subdepartament",
    },
    {
        title: "Asignacion de ocupaciones",
        description:
        "Asigna las ocupaciones en los sub-departamentos de la empresa.",
        link: "/subdepartament-occupation",
    },
    {
        title: "Asignacion de labores",
        description:
            "Asigna las labores en los sub-departamentos de la empresa.",
        link: "/subdepartament-work",
    },
    {
        title: "asignacion de centros de costo",
        description:
            "Asigna los centros de costo en los sub-departamentos de la empresa.",
        link: "/subdepartament-ceco",
    }
];

function NavListMenu({ lista, titulo }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderItems = lista.map(({ title, description, link }) => (
        <NavLink to={link} key={title} >
            <MenuItem onClick={() => setIsMenuOpen(false)}>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                    {description}
                </Typography>
            </MenuItem>
        </NavLink>
    ));


    return (
        <React.Fragment>
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography as="a" href="#" variant="small" className="font-normal">
                        <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
                            <Square3Stack3DIcon className="h-[18px] w-[18px]" /> {titulo}{" "}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                    >
                        <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
                    </Card>
                    <ul className="col-span-4 flex w-full flex-col gap-1">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
                <Square3Stack3DIcon className="h-[18px] w-[18px]" /> {titulo}{" "}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
                {renderItems}
            </ul>
        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    
    {
        label: "Blocks",
        icon: CubeTransparentIcon,
        link: "/blocks",
    },
    {
        label: "Docs",
        icon: CodeBracketSquareIcon,
        link: "/docs",
    },
    {
        label: "Registrar",
        icon: UserCircleIcon,
        link: "/register",
    },
];
function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu lista={navListMenuItems} titulo={"Secciones"} />
            <NavListMenu lista={navListMenuItemsProps} titulo={"Propiedades"} />
            <NavListMenu lista={navListMenuItemsdtprops} titulo={"Asignaciones"} />
            {navListItems.map(({ label, icon,link }, key) => (
                <NavLink to={link} key={label}>
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px] text-blue-gray-600" })}{" "}
                        <Typography as="span" variant="small" className="font-normal text-blue-gray-800">
                            {label}
                        </Typography>
                    </MenuItem>
                </NavLink>
            ))}
        </ul>
    );
}

export function NavSisra() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
            <div className="relative mx-auto flex items-center text-blue-gray-900">
                <Typography
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    <NavLink to="/">
                        SISRA Agrokasa</NavLink>
                </Typography>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                <ProfileMenu />
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );
}