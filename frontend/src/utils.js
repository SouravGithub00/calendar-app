import apiRequest from "./apiRequests";

const  convertTo24Hour = (timeStr)=> {
    // Extract the parts of the time string using a regular expression
    const timeParts = timeStr.match(/(\d+):(\d+)([ap]m)/i);
    
    if (timeParts === null) {
      throw new Error("Invalid time format");
    }
  
    let [_, hours, minutes, period] = timeParts;
  
    // Convert hours and minutes to integers
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
  
    // Convert the period to lowercase
    period = period.toLowerCase();
  
    // Convert hours to 24-hour format
    if (period === 'pm' && hours < 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }
  
    // Format hours and minutes as two digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }

  async function listUsersAndGetIds(baseurl) {
  
    // Function to list users
    async function listUsers() {
      try {
        const users = await apiRequest(`${baseurl}/user`, 'GET');
        return users;
      } catch (error) {
        console.error('Error listing users:', error);
        throw error;
      }
    }
  
    // Function to create a user
    async function createUser(name, type) {
      try {
        const newUser = await apiRequest(`${baseurl}/user/create`, 'POST', { name, type });
        return newUser;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    }
  
    try {
      let users = await listUsers();
  
      let admin = users.find(user => user.type === 'admin');
      let student = users.find(user => user.type === 'student');
  
      // Create admin if not found
      if (!admin) {
        await createUser('Admin', 'admin');
      }
  
      // Create student if not found
      if (!student) {
        await createUser('Student', 'student');
      }
  
      // List users again to get the new users
      users = await listUsers();
  
      // Find admin and student IDs
      admin = users.find(user => user.type === 'admin');
      student = users.find(user => user.type === 'student');
  
      const adminId = admin ? admin._id : null;
      const studentId = student ? student._id : null;
  
      return { adminId, studentId };
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
  const generateWeekDates = (currentDate) => {
    const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT'];
    const timesPerDay = {
        MON: ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
        TUES: ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
        WED: ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
        THU: ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
        FRI: ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
        SAT: ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
        SUN: [],
    };

    const result = [];
    const currentDayIndex = currentDate.getDay();
    const currentDateNumber = currentDate.getDate();

    // Find the date of the previous Monday
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDateNumber - currentDayIndex + (currentDayIndex === 0 ? -6 : 1));

    // Generate the week dates
    for (let i = 0; i < 7; i++) {
        const date = new Date(mondayDate);
        date.setDate(mondayDate.getDate() + i);

        const dayOfWeek = daysOfWeek[date.getDay()];
        const today = new Date();
        today.setHours(15, 0, 0, 0);
        const isPastDate = (new Date(today)).getTime() > (new Date(date)).getTime(); // Compare with current date without time

        result.push({
            day: dayOfWeek,
            date: date.getDate(),
            times: timesPerDay[dayOfWeek],
            fullDate: date,
            isPastDate: isPastDate,
        });
    }

    return result;
};


  
  
    const baseurl = 'http://localhost:5000/api';

  export {convertTo24Hour, listUsersAndGetIds, baseurl, generateWeekDates }