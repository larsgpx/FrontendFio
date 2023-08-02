import React, { useState, useEffect } from 'react';
import { departamentos, provincias, distritos } from '@/data/ubigeo';

const useUbigeo = () => {
  const [departaments, setDepartaments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDepartament, setSelectedDepartament] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');


  useEffect(() => {
    const fetchDepartamentos = () => {
      try {
        setDepartaments(departamentos);
      } catch (error) {
        console.error('Error al cargar los departamentos:', error);
      }
    };

    fetchDepartamentos();
  }, []);

  useEffect(() => {
    const fetchProvinces = () => {
      try {
        const filterProvinces = provincias.filter(
          (province) => selectedDepartament in province);
        setProvinces(filterProvinces[0][selectedDepartament]);
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
        const filterDistricts = distritos.filter(
          (district) => selectedProvince in district);
        setDistricts(filterDistricts[0][selectedProvince]);
      } catch (error) {
        console.error('Error al cargar los distritos:', error);
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
