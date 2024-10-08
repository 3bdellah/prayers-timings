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
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(() => ({
  backgroundColor: '#00000000',

}));



export default function MainContent() {
//array data:
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

const PrayersArray = [
  {
    key:"Fajr",
    displayName:"الصبح" 
  },
  {
    key:"Dhuhr",
    displayName:"الظهر" 
  },
  {
    key:"Asr",
    displayName:"العصر" 
  },
  {
    key:"Maghrib",
    displayName:"المغرب" 
  },
  {
    key:"Isha",
    displayName:"العشاء" 
  },
]
  

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
const [Date, SetDate] = useState("");
const [Heur, setHeur] = useState("");
const [nextPrayer, setnextPrayer] = useState(0);
const [timerDown, setTimerDown] = useState('');
//api

const extractData = async () => {
  const Responce = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${SelectedCity.ApiName}&country=Morocco&method=8`);
  setTimings(Responce.data.data.timings);
  
  const date = Responce.data.data.date;
  SetDate(date.hijri.weekday.ar +" "+ date.hijri.day+" "+ date.hijri.month.ar +" "+ date.hijri.year);
}
//useEffect:
useEffect(() =>{
  extractData() 
  
},[SelectedCity])

useEffect(()=>{
  setHeur(moment().format('MM-D-YYYY | HH:mm'))
  let Interval = setInterval(() => {
    SetupCountDownTimer()
    }, 1000);

    return () =>{
      clearInterval(Interval)
      
    }
},[Timings,timerDown])


 

//functions:

const SetupCountDownTimer = ()=>{
  const momentNow = moment();
  if(momentNow.isAfter(moment(Timings['Fajr'],"HH:mm")) && momentNow.isBefore(moment(Timings['Dhuhr'],"HH:mm"))){
    setnextPrayer(1);
  }else if(momentNow.isAfter(moment(Timings['Dhuhr'],"HH:mm")) && momentNow.isBefore(moment(Timings['Asr'],"HH:mm"))){
    setnextPrayer(2);
  }else if(momentNow.isAfter(moment(Timings['Asr'],"HH:mm")) && momentNow.isBefore(moment(Timings['Maghrib'],"HH:mm"))){
    setnextPrayer(3);
  }else if(momentNow.isAfter(moment(Timings['Maghrib'],"HH:mm")) && momentNow.isBefore(moment(Timings['Isha'],"HH:mm"))){
    setnextPrayer(4);
  }else{
    setnextPrayer(0);
  }
  
//countDown timer:

function getTimeInterval(startTime, endTime){
  return moment(moment(startTime,"hh:mm:ss").diff(moment(endTime,"hh:mm"))).format("hh:mm:ss"); 
}

const nextPrayerTime = Timings[PrayersArray[nextPrayer].key]
// const momentDiff = moment(nextPrayerTime, "HH:mm").diff(momentNow)
// const momentDuration = moment.duration(momentDiff)
// const timedown = `${momentDuration.hours()}:${momentDuration.minutes()}:${momentDuration.seconds()}`;
const timedown = getTimeInterval(nextPrayerTime,momentNow)
setTimerDown(timedown);
}

const handleChange = (event) => {
  const cityObject =AvilaibleCitys.find( (city) =>
  {
    return city.ApiName == event.target.value;
  });
  setSelectedCity(cityObject);
  };
 

  return (
  <>
    {/*main grid*/}
          <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Grid xs={6}>
              <div >
                <h2>  {Date}  | {Heur}</h2>
                <h1>مدينة {SelectedCity.DisplayName}</h1>
              </div>
            </Grid>
            <Grid xs={6}>
              <div >
                <h2> الوقت المتبقي حتى صلاة {PrayersArray[nextPrayer].displayName} </h2>
                <h1>{timerDown}</h1>
              </div>
            </Grid>
          </Grid>
    {/*divider*/}
    <Divider style={{borderColor:"white",opacity:"0.3"}}/>
    {/*stack group*/}
    <div className='prayers-cards' > 
    <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={1} > 
        <Item><PrayersCards img="/fajr-prayer.png" salat="الصبح" time={Timings.Fajr}/></Item>
        <Item><PrayersCards img="/dhhr-prayer-mosque.png" salat="الظهر" time={Timings.Dhuhr}/></Item>
        <Item><PrayersCards img="/asr-prayer-mosque.png" salat="العصر" time={Timings.Asr}/></Item>
        <Item><PrayersCards img="/sunset-prayer-mosque.png" salat="المغرب" time={Timings.Maghrib}/></Item>
        <Item><PrayersCards img="/night-prayer-mosque.png" salat="العشاء" time={Timings.Isha}/></Item>
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







