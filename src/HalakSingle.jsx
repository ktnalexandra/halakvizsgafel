import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const HalakSingle = () => {
  const { halakId } = useParams();
  const [halak, setHalak] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        const valasz = await axios.get(`https://halak.onrender.com/api/Halak/${halakId}`);
        const halData = valasz.data;

        if (halData.kep) {
          halData.imageUrl = `data:image/jpeg;base64,${halData.kep}`;
        }
        setHalak(halData);
      } catch (hiba) {
        console.log("Hiba a hal adatok lekérésekor:", hiba);
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [halakId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Hal</h2>
      {isPending || !halak ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card h-100">
              <h3 className="text-dark text-center">Hal neve: {halak.nev}</h3>
              <h4 className="text-dark text-center">Hal faja: {halak.faj}</h4>
              <h4 className="text-dark text-center">Hal mérete: {halak.meretCm} cm</h4>
              <div className="card-body d-flex flex-column align-items-center">
                {halak.imageUrl ? (
                  <img src={halak.imageUrl} alt={halak.nev} className="img-fluid" style={{ width: "200px" }} />
                ) : (
                  <p className="text-muted">Nincs kép elérhető</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-3">
              <Link to="/"><i className="bi bi-backspace-fill fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
              <Link to={`/mod-halak/${halakId}`}><i className="bi bi-pencil-square fs-3"></i></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HalakSingle;