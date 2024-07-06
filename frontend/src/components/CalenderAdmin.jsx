// src/CalendarAdmin.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Avatar, Select, MenuItem } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import apiRequest from '../apiRequests';
import { baseurl, convertTo24Hour, generateWeekDates } from '../utils.js';
import { toast } from 'react-toastify';

const CalendarAdmin = ({adminId, studentId, setIsUserTypeSelected}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeekDate, setCurrentWeekDate] = useState(createTodayAt3PM());


  const handleDateSelect = (data) => {
    if(JSON.stringify(data) === JSON.stringify(selectedDate)) {
        setSelectedDate(null)
    }
    else {
        setSelectedDate(data);
    }
  };

  const handleDateForward = () => {
    setSelectedDate(null);
    setCurrentWeekDate(addDays(currentWeekDate, 7))
  }

  const handleDateBackward = () => {
    setSelectedDate(null);
    setCurrentWeekDate(addDays(currentWeekDate, -7))
  }

  const handleCancel = () => {
    setSelectedDate(false)
  }

  const handleCreateSlot = async () => {
       const data =  await apiRequest(`${baseurl}/slot/create`, 'POST', {
            adminId, startTime: convertTo24Hour(selectedDate.time), date: selectedDate.fullDate
        });
        toast.success("Slot Successfully Created");
        setSelectedDate(null);
        fetchCreatedSlots();
  }

  const handleCancelSlot = async() => {
    await apiRequest(`${baseurl}/slot/${selectedDate?.slotId}`, 'DELETE');
    toast.success("Slot Successfully Deleted");
    setSelectedDate(null);
    fetchCreatedSlots();
  }

  const fetchCreatedSlots = async() => {
    const data =  await apiRequest(`${baseurl}/slot?adminId=${adminId}`, 'GET');
    setCreatedSlots(data);
  }

  const handleGoToHome = () => {
    setIsUserTypeSelected(false)
  }

const [dates, setDates] = useState([]);

const [createdSlots, setCreatedSlots] = useState([]);


useEffect(()=>{
    setDates(generateWeekDates(currentWeekDate))
},[currentWeekDate])


useEffect(()=> {
    fetchCreatedSlots();
},[])



  return (
    <Box p={4}>
      <Box sx={{
        display:'flex', flexDirection:'row', alignItems:'center', borderBottom:'1px solid gray', height:'80px'
      }}>
        <Button onClick={handleGoToHome}><ArrowBackIos /></Button>
        <Typography variant="h6" >Admin Calender</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Button onClick={handleDateBackward}><ArrowBackIos /></Button>
        <Typography sx={{fontWeight:'bold'}}>{formatDateToMonthYear(getPreviousMonday(currentWeekDate))}</Typography>
        <Button onClick={handleDateForward}><ArrowForwardIos /></Button>
      </Box>
      <Grid container spacing={2} mt={2}>
        {dates.map((date, index) => (
          <Grid item xs key={index}>
            <Typography variant="body2" align="center" color="primary">{date.day}</Typography>
            <Typography variant="h6" align="center">{date.date}</Typography>
            {date.times.map((time, idx) => {
                let isCreatedSlot = false;
                let slotId = null;
                createdSlots?.forEach((slot)=>{
                    if(getMS(slot?.date) === getMS(date?.fullDate) && convertTo24Hour(time) == slot?.startTime) {
                        isCreatedSlot = true;
                        slotId = slot?._id;
                    }
                })
                return(
                    <Button
                        key={idx}
                        disabled = {date?.isPastDate}
                        variant={selectedDate?.fullDate === date.fullDate && selectedDate.time === time ? 'contained' : 'outlined'}
                        color={selectedDate?.fullDate === date.fullDate && selectedDate.time === time ? 'secondary' : isCreatedSlot? 'green' : 'secondary'}
                        fullWidth
                        onClick={() => handleDateSelect({
                            fullDate: date.fullDate, time, slotId
                        })}
                        sx={{ my: 0.5, backgroundColor: selectedDate?.fullDate === date.fullDate && selectedDate.time === time ?  'secondary' : isCreatedSlot ? 'tertiary.main' :'' }}
                    >
                        {time}
                    </Button>
                )
            })}
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2}>
        {
            selectedDate && 
            <>
            <Button onClick={handleCancel} variant="outlined" color="primary">Cancel</Button>
            {
                selectedDate?.slotId ? 
                    <Button onClick={handleCancelSlot} sx={{ marginLeft: '10px'}} variant="contained" color="primary">Cancel Slot</Button>:
                    <Button onClick={handleCreateSlot} sx={{ marginLeft: '10px'}} variant="contained" color="primary">Create Slot</Button>
                
            }
            
            </>
        }
        
      </Box>
    </Box>
  );
};




  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const getPreviousMonday = (date) => {
    const currentDayIndex = date.getDay();
    const daysToSubtract = currentDayIndex === 0 ? 6 : currentDayIndex - 1; // If it's Sunday, subtract 6 days, otherwise subtract the day index minus 1
    return addDays(date, -daysToSubtract);
  };
  
  const formatDateToMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  function createTodayAt3PM() {
    // Get today's date
    const today = new Date();
  
    // Set hours, minutes, seconds, and milliseconds for 3:00 PM
    today.setHours(15, 0, 0, 0);
  
    return today;
  }

  function getMS(date) {
    return (new Date(date)).getTime()
  }
export default CalendarAdmin;
