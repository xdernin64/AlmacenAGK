import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Chip,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    UserCircleIcon,
    CubeTransparentIcon,
    Bars3Icon,
    XMarkIcon,
    FlagIcon,
    ChatBubbleOvalLeftIcon,
    UsersIcon,
    FolderIcon,
    Square3Stack3DIcon,
    RocketLaunchIcon,
    FaceSmileIcon,
    PuzzlePieceIcon,
    GiftIcon,
    UserGroupIcon,
    ClockIcon, MapIcon, BuildingLibraryIcon, BuildingOffice2Icon, BuildingOfficeIcon, BuildingStorefrontIcon, DocumentMinusIcon
    , BriefcaseIcon, CurrencyDollarIcon, CogIcon, UserMinusIcon, DocumentPlusIcon, UserPlusIcon, ComputerDesktopIcon,ArrowsPointingOutIcon
} from "@heroicons/react/24/outline";
import {TbLogout} from 'react-icons/tb'
import Logo from "./logo";
import { NavLink } from "react-router-dom";
import { logoutsupabase } from "../../../supabaseClient";

const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    green: "bg-green-50 text-green-500",
    "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
    purple: "bg-purple-50 text-purple-500",
    teal: "bg-teal-50 text-teal-500",
    cyan: "bg-cyan-50 text-cyan-500",
    pink: "bg-pink-50 text-pink-500",
};

const navListMenuItems = [
    {
        color: "blue",
        icon: UserGroupIcon,
        title: "Asistencias",
        description: "Aqui podras ver y agregar las asistencias,faltos,descansos,etc.",
        link: "/asistencia"
    },
    {
        color: "orange",
        icon: ClockIcon,
        title: "Horas extras",
        description: "Registra las horas extras generadas por personal que asistió",
        link: "/horas-extras"
    },
    {
        color: "green",
        icon: UsersIcon,
        title: (
            <div className="flex items-center gap-1">
                Usuarios{" "}
                <Chip
                    size="sm"
                    color="green"
                    variant="ghost"
                    value="Creciendo"
                    className="capitalize"
                />
            </div>
        ),
        description: "Lista de usarios asignados dentro del sistema",
        link: "/users"
    },
    {
        color: "purple",
        icon: FolderIcon,
        title: "Consolidado",
        description: "Aqui podras ver y agregar las asistencias,faltos,descansos,etc.",
        link: "/consolidado"
    }
];
const navListCreate = [
    {
        color: "green",
        icon: MapIcon,
        title: "Zonas",
        description: "Aqui podras ver y agregar las zonas",
        link: "/zones"

    },
    {
        color: "green",
        icon: BuildingLibraryIcon,
        title: "Gerencias",
        description: "Aqui podras ver y agregar las Gerencias",
        link: "/areas"

    },
    {
        color: "green",
        icon: BuildingOffice2Icon,
        title: "Sedes",
        description: "Aqui podras ver y agregar las sedes",
        link: "/locations"
    },
    {
        color: "green",
        icon: BuildingOfficeIcon,
        title: "Áreas",
        description: "Aqui podras ver y agregar los Áreas",
        link: "/departaments"
    },
    {
        color: "green",
        icon: BuildingStorefrontIcon,
        title: "Sub-areas",
        description: "Aqui podras ver y agregar las Sub-areas",
        link: "/subdepartaments"
    },
    {
        color: "green",
        icon: DocumentMinusIcon,
        title: "Ocupaciones",
        description: "Aqui podras ver y agregar las ocupaciones",
        link: "/occupations"
    },
    {
        color: "green",
        icon: BriefcaseIcon,
        title: "Labores",
        description: "Aqui podras ver y agregar las labores",
        link: "/works"
    },
    {
        color: "green",
        icon: CurrencyDollarIcon,
        title: "Centro de cost",
        description: "Aqui podras ver y agregar los centros de costos",
        link: "/cecos"
    }

]
const navListAssign = [
    {
        color: "orange",
        icon: BuildingLibraryIcon,
        title: "Asignacion de Gerencias",
        description: "Asigna las Gerencias en las Zonas de la empresa.",
        link: "/zone-area",

    },
    {
        color: "orange",
        icon: BuildingOffice2Icon,
        title: "Asignacion de sedes",
        description:
            "Asigna las sedes en las zonas de la empresa.",
        link: "/zone-location"
    },
    {
        color: "orange",
        icon: BuildingOfficeIcon,
        title: "Asignacion de Áreas",
        description:
            "Asigna las Áreas en las Gerencias de la empresa.",
        link: "/area-departament",
    },
    {
        color: "orange",
        icon: BuildingStorefrontIcon,
        title: "Asignacion de Sub-áreas",
        description:
            "Asigna las Sub-áreas en las Áreas de la empresa.",
        link: "/departament-subdepartament",
    },
    {
        color: "orange",
        icon: DocumentMinusIcon,
        title: "Asignacion de ocupaciones",
        description:
            "Asigna las ocupaciones en las Áreas  de la empresa.",
        link: "/subdepartament-occupation",
    },
    {
        color: "orange",
        icon: BriefcaseIcon,
        title: "Asignacion de labores",
        description:
            "Asigna las labores en las Áreas  de la empresa.",
        link: "/subdepartament-work",
    },
    {
        color: "orange",
        icon: CurrencyDollarIcon,
        title: "asignacion de centros de costo",
        description:
            "Asigna los centros de costo en las Áreas de la empresa.",
        link: "/subdepartament-ceco",
    }

]

function NavListMenu({ lista, titulo, icono }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const renderItems = lista.map(
        ({ icon, title, description, color, link }, key) => (
            <NavLink to={link} key={title}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
                    <div className={`rounded-lg p-5 ${colors[color]}`}>
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm"
                        >
                            {title}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </NavLink>
        )
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-normal">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            {React.createElement(icono, {
                                strokeWidth: 2,
                                className: "h-[18px] w-[18px]",
                            })}
                            {titulo}
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList({rol}) {
    
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <NavListMenu lista={navListMenuItems} titulo={"Gestión"} icono={ComputerDesktopIcon} />
            {rol === "ADMINISTRADOR" && (
                <>
                    <NavListMenu lista={navListCreate} titulo={"Creación"} icono={DocumentPlusIcon} />
                    <NavListMenu lista={navListAssign} titulo={"Asignación"} icono={CogIcon} />
                    <NavLink to={"/register"}>
                        <ListItem className="flex items-center gap-2 py-2 pr-4">
                            <UserPlusIcon className="h-[18px] w-[18px]" />
                            Registrar
                        </ListItem>
                    </NavLink>
                </>
            )}
            <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-normal"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4 hidden">
                    <UserCircleIcon className="h-[18px] w-[18px]" />
                    Account
                </ListItem>
            </Typography>
        </List>
    );
}


export function NavbarWithMegaMenu({rol}) {
    const [openNav, setOpenNav] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <NavLink to="/">
                    <div className="flex items-center">
                        <Logo />
                        SISRA Agrokasa </div> </NavLink>
                {rol && (
                    <div className="hidden lg:block">
                        <NavList rol={rol} />
                    </div>
                )}
                <div className="hidden gap-2 lg:flex">
                    <Button variant="gradient" color="red" size="sm" onClick={logoutsupabase}>
                        <TbLogout className="text-sm font-bold" />
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                {rol && (
                    <NavList rol={rol} />
                )}
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Button variant="gradient" onClick={logoutsupabase} size="sm" fullWidth>
                        Cerrar Sesion
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}
