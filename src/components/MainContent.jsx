// import React from 'react';
import "../App.css";
import PrayersCards from './PrayersCards';
import Grid from '@mui/material/Unstable_Grid2';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import moment from "moment";



export default function MainContent() {

  

//states:
const [Timings, setTimings] = useState(
  {
          "Fajr": "",
          "Dhuhr": "",
          "Asr": "",
          "Maghrib": "",
          "Isha": "",
  }
);

const [SelectedCity, setSelectedCity] = useState(
  {
    DisplayName:"أكــادير",
    ApiName:"Agadir"
  });

const AvilaibleCitys = [
  {
    DisplayName:"أكــادير",
    ApiName:"Agadir"
  },
  {
    DisplayName:"الدار البيضاء",
    ApiName:"Casablanca" 
  },
  {
    DisplayName:"الرباط",
    ApiName:"Rabat"
  },
  {
    DisplayName:"مراكش",
    ApiName:"Marrakesh"
  },
  {
    DisplayName:"فــــاس",
    ApiName:"Fes"
  },
  {
    DisplayName:"طنجة",
    ApiName:"Tangier"
  },
  ]
const [Date, SetDate] = useState("");
const [Heur, setHeur] = useState("");
const [Timer, setTimer] = useState(10);
//api

const extractData = async () => {
  const Responce = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${SelectedCity.ApiName}&country=Morocco&method=8`);
  setTimings(Responce.data.data.timings);
 const date = Responce.data.data.date;
 SetDate(date.hijri.weekday.ar +" "+ date.hijri.day+" "+ date.hijri.month.ar +" "+ date.hijri.year);
 
}

  useEffect(() =>{
    extractData() 
    setHeur(moment().format('MM D YYYY | h:mm'))
    let Interval = setInterval(() => {
    setTimer((t) => {
      return t - 1
    })
    }, 1000);
    return () =>{
      clearInterval(Interval)
    }
  },[SelectedCity])

const handleChange = (event) => {
  const cityObject =AvilaibleCitys.find( (city) =>
  {
    return city.ApiName == event.target.value;
  });
  setSelectedCity(cityObject);
  };
 

  return (
  <>
    {/*main drid*/}
          <Grid container spacing={2}>
            <Grid xs={6} >
              <div>
                <h2>  {Date}  | {Heur}</h2>
                <h1>مدينة {SelectedCity.DisplayName}</h1>
              </div>
            </Grid>
            <Grid xs={6} >
              <div>
                <h2> المتبقي حتى صلاة العصر </h2>
                <h1>{Timer}:45:56</h1>
              </div>
            </Grid>
          </Grid>
    {/*divider*/}
    <Divider style={{borderColor:"white",opacity:"0.3"}}/>
    {/*stack group*/}
    <div className='prayers-cards' > 
    <Stack direction="row" spacing={1} > 
        <PrayersCards img="/fajr-prayer.png" salat="الصبح" time={Timings.Fajr}/>
        <PrayersCards img="/dhhr-prayer-mosque.png" salat="الظهر" time={Timings.Dhuhr}/>
        <PrayersCards img="/asr-prayer-mosque.png" salat="العصر" time={Timings.Asr}/>
        <PrayersCards img="/sunset-prayer-mosque.png" salat="المغرب" time={Timings.Maghrib}/> 
        <PrayersCards img="/night-prayer-mosque.png" salat="العشاء" time={Timings.Isha}/>
        </Stack>
    </div>
    {/*select section*/ }
    <Stack direction="row" justifyContent={"center"} marginTop={"10px"}>
    <Box sx={{ minWidth: 300 }} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
        <span style={{color:"antiquewhite"}}>المدينة</span>
        </InputLabel>
        
        <Select
        style={{color:"antiquewhite"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="City"
          onChange={handleChange}
        >
          {AvilaibleCitys.map((City)=>{
            return(
            <MenuItem value={City.ApiName} key={City.ApiName}> {City.DisplayName} </MenuItem>
            );
          })}
        </Select>

      </FormControl>
    </Box> 
    </Stack>

</>

  );
}







