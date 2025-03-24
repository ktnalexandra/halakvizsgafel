import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

export const HalakMod = () => {
    const params = useParams();
    const id = params.halakId;
    const navigate = useNavigate();
    const [halak, setHalak] = useState({
        nev: '',
        faj: '',
        meretCm: 0,
        kep: '',
    });

    useEffect(() => {
        const fetchHalak = async () => {
            try {
                const response = await axios.get(`https://halak.onrender.com/api/Halak/${id}`);
                setHalak(response.data);
            } catch (error) {
                console.log("Hiba a fetch-elésben: ", error);
            }
        };
        fetchHalak();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setHalak(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://halak.onrender.com/api/Halak/${id}`, halak)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.log("Hiba a halak adatok frissítésében: ", error);
            });
    };

    return (
        <div className="container p-5 bg-light shadow-sm rounded">
            <h2 className="text-center text-dark mb-4">Hal adatainak módosítása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-dark">Hal neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="nev" className="form-control" 
                            value={halak.nev} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-dark">Hal faja:</label>
                    <div className="col-sm-9">
                        <input type="text" name="faj" className="form-control" 
                            value={halak.faj} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-dark">Mérete (cm):</label>
                    <div className="col-sm-9">
                        <input type="number" name="meretCm" className="form-control" 
                            value={halak.meretCm} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-dark">Kép URL:</label>
                    <div className="col-sm-9">
                        <input type="text" name="kep" className="form-control" 
                            value={halak.kep} onChange={handleInputChange} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">Küldés</button>
            </form>
            
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4">
                <Link to="/" className="text-dark"><i className="bi bi-arrow-left-circle fs-4 me-2"></i> Vissza</Link>
            </div>
        </div>
    );
};
