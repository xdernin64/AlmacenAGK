import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField, Button } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons'; // Importa los iconos que desees
import { supabaseAnonKey } from '../../constants/env';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

const UserProfileEditForm = () => {
    const classes = useStyles();
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const user = supabaseAnonKey.auth.user();

            if (user) {
                const { data, error } = await supabase
                    .from('users')
                    .select('name, last_name, phone, email')
                    .eq('id', user.id)
                    .single();

                if (!error) {
                    setUserData(data);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const user = supabase.auth.user();
        if (user) {
            await supabase.from('users').upsert([
                {
                    id: user.id,
                    name: userData.name,
                    last_name: userData.lastName,
                    phone: userData.phone,
                    email: userData.email,
                },
            ]);
        }
    };

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Datos Básicos</h2>
                            <EditOutlined />
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                            >
                                Guardar Cambios
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Datos Adicionales</h2>
                            <EditOutlined />
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <TextField
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Correo Electrónico"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                            >
                                Guardar Cambios
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfileEditForm;

