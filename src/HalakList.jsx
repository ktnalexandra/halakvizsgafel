import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const HalakList = () => {
    const [halak, setHalak] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios.get('https://halak.onrender.com/api/Halak')
            .then((valasz) => {
                const halakWithImages = valasz.data.map((hal) => {
                    if (hal.kep) {
                        return { ...hal, imageUrl: `data:image/jpeg;base64,${hal.kep}` };
                    }
                    return { ...hal, imageUrl: null };
                });
                setHalak(halakWithImages);
            })
            .catch(hiba => console.error("Hiba a halak lekérésekor:", hiba))
            .finally(() => setPending(false));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Halak</h2>
            {isPending ? (<div className="spinner-border"></div>) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {halak.map((hal, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <p className="text-dark text-center">Hal neve: {hal.nev}</p>
                                <p className="text-dark text-center">Hal faja: {hal.faj}</p>
                                <p className="text-dark text-center">Hal mérete: {hal.meretCm}</p>
                                <div className="card-body d-flex flex-column align-items-center">
                                    {hal.imageUrl ? (
                                        <img src={hal.imageUrl} alt={hal.nev} className="img-fluid" style={{ width: "200px" }} />
                                    ) : (
                                        <p className="text-muted">Nincs kép elérhető</p>
                                    )}
                                </div>
                                <div className="text-center">
                                    <Link to={`/hal/${hal.id}`}><i className="bi bi-text-paragraph fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/mod-halak/${hal.id}`}><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};