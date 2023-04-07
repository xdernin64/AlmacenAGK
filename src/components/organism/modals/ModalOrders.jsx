import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../../supabaseClient";


const ModalOrders = ({ onClose, open, customf }) => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            const { data, error } = await supabase
                .from('pedidos')
                .select('*')
            if (error) {
                console.log(error);
            }
            else {
                setOrders(data)
            }
        }
        getOrders()
    }, [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth={true}
            sx={
                {
                    '& .MuiDialog-paper': {
                        width: '100%',
                        height: '60%',
                        margin: 1,
                        padding: 1,
                        borderRadius: 0,
                        boxShadow: 'none',
                    }
                }
            }

        >
            <DialogTitle>Pedidos Guardados</DialogTitle>
            <DialogContent>
                {
                    orders !== undefined ?
                        (<React.Fragment>
                            {orders.map((order, index) => (
                                <div key={index}>
                                    <div className="flex">
                                        <div  className="flex border border-black">
                                            <p className="w-1/2">{order.Name}</p>
                                            <select className="w-1/2"></select>
                                        </div>


                                    </div>
                                </div>
                            ))}
                        </React.Fragment>) :

                        (<div></div>)

                }


            </DialogContent>


        </Dialog>)
}
export default ModalOrders;