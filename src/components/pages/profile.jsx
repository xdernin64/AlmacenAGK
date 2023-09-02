import React from 'react';
import { Avatar, Box, Typography, Card, CardContent } from '@mui/material';
import { Email, Work } from '@mui/icons-material';

const Profile = () => {
    return (
        <div className='pagina border rounded-xl' style={{ backgroundColor: '#4CAF50',  padding: '20px' }}>
            <Box className="p-5 md:p-10">
                <Card elevation={3}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" md={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box display="flex" flexDirection="column" alignItems="center" md={{ alignItems: 'flex-start' }}>
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        fontSize: 48,
                                        backgroundColor: '#ffffff',
                                        color: '#4CAF50',
                                    }}
                                    src="URL_DE_TU_AVATAR"
                                    alt="Avatar"
                                />
                                <Typography variant="h4" mt={2} fontWeight="bold" style={{ color: '#4CAF50' }}>
                                    Nombre Apellido
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    mt={2}
                                    sx={{
                                        backgroundColor: 'gray.200',
                                        borderRadius: '999px',
                                        px: 4,
                                        py: 2,
                                        color: '#4CAF50',
                                    }}
                                >
                                    Rol
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center" mt={5} md={{ mt: 0, ml: 10 }}>
                                <Typography variant="h6" fontWeight="bold" style={{ color: '#4CAF50' }}>
                                    Información
                                </Typography>
                                <Box display="flex" alignItems="center" mt={2}>
                                    <Email sx={{ marginRight: 1, color: '#4CAF50' }} />
                                    <Typography variant="body1">correo@ejemplo.com</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={2}>
                                    <Work sx={{ marginRight: 1, color: '#4CAF50' }} />
                                    <Typography variant="body1">Nombre de Cargo</Typography>
                                </Box>
                                <Typography variant="body2" mt={5} color="text.secondary">
                                    Código: 12345
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Creado por: Nombre del Creador
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default Profile;
