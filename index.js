const periods = document.querySelectorAll(".period");
const activities = document.querySelectorAll(".activity");
const activityTitles = document.querySelectorAll(".activityTitle");
const activityHours = document.querySelectorAll(".activityHours");
const activityLasts = document.querySelectorAll(".activityLast");

const prodDataToActivities = (data, span) => {
  //   hours this period
  activityHours.forEach((act, i) => {
    const hours = data[i].timeframes[span].current;
    act.innerText = `${hours}hrs`;
  });
  //   hours last period
  activityLasts.forEach((act, i) => {
    const lasts = data[i].timeframes[span].previous;
    let lastPeriod;
    span === "daily"
      ? (lastPeriod = "Day")
      : span === "monthly"
      ? (lastPeriod = "Month")
      : (lastPeriod = "Week");
    act.innerText = `Last ${lastPeriod} - ${lasts}hrs`;
  });
};
// fetch func
const fetchData = async () => {
  const response = await fetch("/data.json");
  const data = await response.json();
  //   title
  activityTitles.forEach((act, i) => {
    act.innerText = data[i].title;
  });
  //   img
  activities.forEach((act, i) => {
    let actToLCase = data[i].title.toLowerCase().split(" ").join("-");
    act.style.backgroundImage = `url("/images/icon-${actToLCase}.svg")`;
  });
  //   hours this period and last period (weekly on load)
  //   hours weekly this period
  activityHours.forEach((act, i) => {
    const hours = data[i].timeframes.weekly.current;
    act.innerText = `${hours}hrs`;
  });
  //   hours weekly last period
  activityLasts.forEach((act, i) => {
    const lasts = data[i].timeframes.weekly.previous;
    act.innerText = `Last Week - ${lasts}hrs`;
  });
  periods.forEach((period) => {
    const span = period.innerText.toLowerCase();
    period.addEventListener("click", () => {
      periods.forEach((per2) => {
        //   console.log("here");
        per2.classList.remove("active");
      });
      prodDataToActivities(data, span);
      period.classList.add("active");
    });
  });
};
fetchData();
//   periods clicks
