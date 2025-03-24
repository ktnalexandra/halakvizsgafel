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
        const fetchHalak = async() => {
            try {
                const response = await 
                axios.get(`https://halak.onrender.com/api/Halak/${id}`);
                setHalak(response.data);
            }
            catch(error) {
                    console.log("Hiba a fetch-elésben: ", error);
            }
        };
        fetchHalak();
     }, [id]);

    const handleInputChange= event =>{
        const {nev, value} = event.target;
        setHalak(prevState =>({
            ...prevState,
            [nev] : value
        }));
    }
    const handleSubmit = event =>{
     event.preventDefault();
     axios.put(`https://halak.onrender.com/api/Halak/${id}`, halak)
     .then(() => {
        navigate("/");
     })
     .catch(error => {
        console.log("Hiba a sakk adatok frissítésében: ", error);
     });
    };
    return (
    <div className="p-5 content bg-whitesmoke text-center">
    <form onSubmit={handleSubmit}>
        <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="nev" className="form-control" 
                        defaultValue={halak.nev} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal faja:</label>
                    <div className="col-sm-9">
                        <input type="text" name="faj" className="form-control"
                        defaultValue={halak.faj} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Mérete:</label>
                    <div className="col-sm-9">
                        <input type="number" name="meretCm" className="form-control"
                        value={halak.meretCm.toString()} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Kép:</label>
                    <div className="col-sm-9">
                        <input type="text" name="kep" className="form-control"
                        defaultValue={halak.kep} onChange={handleInputChange}/>
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Küldés</button>
            </form>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
        <Link to="/"><i className="bi bi-backspace-fill fs-6">Vissza</i></Link>&nbsp;&nbsp;&nbsp;
        </div>
        </div>
       
    );
};