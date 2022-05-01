//Default Date() in NewYork Timezone
function stock_date_est() {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );
  //"YYYY-MM_DD"
}

export function valid_date() {
  var holiday = false;
  var holiday_reason = "";
  var time_up = false;

  //stock market is active from 9:30 am to 4:00 pm
  // converting them into minutes from 24 hour time format
  var start_time = 9 * 60 + 30;
  var end_time = 16 * 60;
  let stock_est_date = stock_date_est();

  // get EST's month and date to know if it is a holiday
  let stock_month = stock_est_date.getMonth();
  let stock_date = stock_est_date.getDate();
  let key: string = `${stock_month},${stock_date}`;
  if (holidays.hasOwnProperty(key)) {
    holiday = true;
    holiday_reason = holidays[key];
  }

  //weekends
  else if (stock_est_date.getDay() == 6 || stock_est_date.getDay() == 0) {
    holiday = true;
    holiday_reason = "Weekend";
  }

  let time_now =
    stock_date_est().getHours() * 60 + stock_date_est().getMinutes();

  //to check est time is between 9:30 am and 4:00 pm
  if (start_time <= time_now && time_now <= end_time) {
    time_up = false;
  } else {
    holiday_reason = "stocks off hours";
    time_up = true;
  }
  return { holiday, holiday_reason, time_up };
}

interface IHolidays {
  [key: string]: string;
}

const holidays: IHolidays = {
  "0,1": "New Years Day",
  "1,21": "Washington's Birthday",
  "3,15": "Good Friday",
  "4,30": "Memorial Day",
  "6,4": "Independence Day",
  "8,5": "Labor Day",
  "10,24": "Thanksgiving Day 1",
  "10,25": "Thanksgiving Day 2", //Thanksgiving Day 2 early close
  "11,26": "Christmas Day",
};
