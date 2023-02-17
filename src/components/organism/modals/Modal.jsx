import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { getToday } from '../../../helpers/date';
import { Authstate } from '../../../firebase';
import Swal from 'sweetalert2';
import { Button, ButtonBase, Dialog, IconButton } from '@mui/material';

const Modal = ({ open, onClose, cod,customf }) => {

    const handlesubmit = (e) => {
        e.preventDefault();
        var tipo;
        console.log('usercod: ' + Authstate().uid + ' cod: ' + cod + ' area: ' + e.target.area.value + ' cantidad: ' + e.target.cantidad.value + ' descripcion: ' + e.target.descripcion.value + ' fecha: ' + e.target.fecha.value);
        if (e.target.cantidad.value > 0) {
            tipo = 'Ingreso';
        } else if (e.target.cantidad.value < 0) {
            tipo = 'Egreso';
        }
        else {
            tipo = 'Nulo';
        }
        const savearticle = async () => {
            const { error } = await supabase.from('Stocks').insert(
                {
                    user_id: Authstate().uid,
                    p_id: cod,
                    area: e.target.area.value,
                    quantity: e.target.cantidad.value,
                    description: e.target.descripcion.value,
                    date: e.target.fecha.value,
                    tipo: tipo
                }
            )
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal! :(',
                    footer: '<a href="">Por que salio mal?</a>'
                })
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                customf;
            }
        }
        savearticle();

    };
    console.log(cod);
    //if (!open) return null;
    const [article, setArticle] = useState();
    const [area, setArea] = useState();
    const getArticle = async () => {
        const { data, error } = await supabase.from('Inventario').select().eq('COD', cod)
        setArticle(data);
    }
    const getArea = async () => {
        const { data, error } = await supabase.from('AREAS').select()
        setArea(data);
    }

    useEffect(() => {
        if (cod != null) {

            getArticle();
            getArea();
        }

    }, [cod]);

    return (
        <Dialog
            open={open}
        >
            
            <div onClick={onClose} className='overlay'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='modalContainer'
                >
                    {
                        article != undefined ? (
                            <div className="flex flex-col md:flex-row w-full bg-slate-600 scrollbar-hide">
                                {
                                    article.map((art, index) => (
                                        <React.Fragment key={index}>
                                            <div className='md:flex '>
                                                <div className='flex flex-row justify-between  border border-gray-500 m-2 rounded-lg bg-white basis-6/6'>
                                                    <img onClick={onClose} className="object-contain w-96 rounded-lg h-96 md:h-auto  md:rounded-none md:rounded-l-lg  " alt="" src={art.URL} />
                                                </div>
                                                <div className="flex flex-col  p-6 basis-1/2">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">{art.COD}</h5>
                                                    <h2 className="text-2xl font-bold tracking-tight text-gray-100 dark:text-white">{art.NAME}</h2>
                                                    <p className="mb-2 text-gray-600 dark:text-gray-400">{art.DESCRIPCION}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between p-4 basis-1/2 items-center md:items-end">
                                                <form className="w-full max-w-sm p-1" onSubmit={handlesubmit}>
                                                    <input required type='date' name='fecha' defaultValue={getToday()} placeholder='Ingresar fecha' className='w-full px-3 py-2 mb-3 text-base text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline' />
                                                    <select required name='area' className="w-full px-3 py-2 mb-3 text-base text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline" id="grid-state">
                                                        {
                                                            area != undefined && (
                                                                area.map((area, index) => (
                                                                    <option key={index} value={area._key}>{area.area}</option>
                                                                )))
                                                        }
                                                    </select>
                                                    <div className="flex mt-2 mb-2">
                                                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                            {art.UM}
                                                        </span>
                                                        <input type="number" name='cantidad' className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese cantidad" />
                                                    </div>
                                                    <textarea required name='descripcion' placeholder='Ingresar detalles ejemplo ¿En qué se usará?' className='w-full pt-1 px-3 py-2 mb-3 text-base text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline' />
                                                    <div className='border-t-2'>
                                                        <input required type='submit' value='Agregar' className='bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 p-5 rounded-full' />
                                                        
                                                    </div>
                                                </form>
                                            </div>
                                        </React.Fragment>))
                                }

                            </div>
                        )
                            : (
                                <Stack spacing={1}>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton variant="rectangular" width={210} height={60} />
                                    <Skeleton variant="rounded" width={210} height={60} />
                                </Stack>
                            )
                    }
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
