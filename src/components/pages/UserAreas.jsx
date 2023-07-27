import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Users from "../organism/tabs/Users";
import Areas from "../organism/tabs/Areas";

const UserAreas = () => {
    const [activeTab, setActiveTab] = React.useState("Usuarios");
    const data = [
        {
            label: "Usuarios ",
            value: "Usuarios",
        },
        {
            label: "React",
            value: "react",    
        },
        {
            label: "Gerencias",
            value: "Gerencias",
        }
    ];
    return (
        <div className="pagina max-[770px]:mb-24">
            <Tabs value={activeTab} >
                <TabsHeader 
                    className="rounded-none border-b-2  border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className: "bg-transparent border-b-2 border-b-slate-800 border-blue-500 shadow-none rounded-none",
                    }}
                >
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={`${activeTab === value ? "text-slate-900 bg-gray-300 " : "text"}`}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    <TabPanel value="Usuarios">
                        <Users />
                    </TabPanel>
                    <TabPanel value="Gerencias">
                        <Areas></Areas>
                    </TabPanel>
                    
                </TabsBody>
            </Tabs></div>
    );
}
export default UserAreas