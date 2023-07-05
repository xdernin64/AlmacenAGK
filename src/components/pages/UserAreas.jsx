import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Users from "../organism/tabs/Users";

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
            label: "Vue",
            value: "vue",
        }
    ];
    return (
        <div className="pagina">
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
                </TabsBody>
            </Tabs></div>
    );
}
export default UserAreas