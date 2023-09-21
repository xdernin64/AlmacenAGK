import React, { useState } from "react";
import { Chart } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);


const LineChart = () => {
    const [data, setData] = useState({
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
            {
                label: "Ventas",
                data: [10, 20, 30, 40, 50],
            },
        ],
    });

    return (
        <div>
            <Chart
                type="line"
                data={data}
                options={{
                    title: {
                        display: true,
                        text: "Ventas mensuales",
                    },
                }}
            />
        </div>
    );
};

export default LineChart;

