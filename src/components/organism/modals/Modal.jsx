import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import Loader from '../loader';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Switch } from '@mui/material';

const Modal = ({ open, onClose, cod }) => {

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log('submit' + cod);
    };
    console.log(cod);
    if (!open) return null;
    const [article, setArticle] = useState();
    const getArticle = async () => {
        const { data, error } = await supabase.from('Inventario').select().eq('COD', cod)
        setArticle(data);
    }
    useEffect(() => {
        getArticle();
    }, []);


    return (
        <div onClick={onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'
            >
                {
                    article != undefined ? (
                        <div className="flex flex-col md:flex-row bg-slate-600 round rounded-lg">
                            {
                                article.map((art, index) => (
                                    <div key={index} className='md:flex '>
                                        <div className='flex flex-row justify-between  border border-gray-500 m-2 rounded-lg bg-white basis-6/6'>
                                            <img className="object-contain w-96 rounded-lg h-96 md:h-auto  md:rounded-none md:rounded-l-lg  " alt="" src={art.URL} />
                                        </div>
                                        <div className="flex flex-col  p-6 basis-1/2">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{art.COD}</h5>
                                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{art.NAME}</h2>
                                            <p className="mb-2 text-gray-600 dark:text-gray-400">{art.DESCRIPCION}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex flex-col justify-between p-4 basis-1/2 items-center md:items-end">
                                <form className="w-full max-w-sm p-1" onSubmit={handlesubmit}>
                                    <select className="w-full px-3 py-2 mb-3 text-base text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline" id="grid-state">
                                        <option>Seleccionar</option>
                                        <option>...</option>
                                    </select>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                                    </label>
                                    <input type='number' className='w-full px-3 py-2 mb-3 text-base text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline' />
                                    <textarea className='w-full pt-1 px-3 py-2 mb-3 text-base text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline' />
                                    <input type='submit' value='Agregar' className='bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 p-5 rounded-full' />
                                </form>
                            </div>
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
    );
};

export default Modal;
