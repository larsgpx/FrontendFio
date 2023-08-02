import React, { useState, useEffect } from 'react';
import { departamentos, provincias, distritos } from '@/data/ubigeo';

const useUbigeo = () => {
  const [ubigeo, setUbigeo] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDepartament, setSelectedDepartament] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');


  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_UBIGEO;
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const newDepartments = [];
            const ubigeoData = data.data;
            if (ubigeoData) {
              ubigeoData.forEach((ubi) => {
                  if (!ubi.relationships.parent.data) {
                    newDepartments.push({
                      id: ubi.id,
                      departamento: ubi.attributes.name
                    })
                  }
              });
            }

            setUbigeo(ubigeoData);
            setDepartaments(newDepartments);
        })
    } catch (error) {
        console.error(error);
    }
}, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const newProvinces = [];
        ubigeo.forEach((provi) => {
          if (provi.relationships.parent.data && provi.relationships.parent.data.id === selectedDepartament) {
            newProvinces.push({
              id: provi.id,
              provincia: provi.attributes.name
            })
          }
        });
        setProvinces(newProvinces);
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }
    };

    if (selectedDepartament) {
      fetchProvinces();
    } else {
      setProvinces([]);
    }
  }, [selectedDepartament]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const newDistricts = [];
        ubigeo.forEach((district) => {
          if (district.relationships.parent.data && district.relationships.parent.data.id === selectedProvince) {
            newDistricts.push({
              id: district.id,
              distrito: district.attributes.name
            })
          }
        });
        setDistricts(newDistricts);
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }
    };

    if (selectedProvince) {
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  return {
    departaments,
    provinces,
    districts,
    selectedDepartament,
    setSelectedDepartament,
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
  };
};

export default useUbigeo;
