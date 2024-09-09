// بخش اول: دریافت ساعت آنلاین تهران از API
async function getOnlineTime() {
    try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Tehran');
        const data = await response.json();
        const datetime = new Date(data.datetime);
        const hours = String(datetime.getHours()).padStart(2, '0');
        const minutes = String(datetime.getMinutes()).padStart(2, '0');
        document.getElementById('clock').textContent = `ساعت تهران: ${hours}:${minutes}`;
    } catch (error) {
        document.getElementById('clock').textContent = 'خطا در دریافت زمان آنلاین';
    }
}

// به‌روزرسانی زمان هر 60 ثانیه
setInterval(getOnlineTime, 60000);
getOnlineTime(); // اولین بار که صفحه لود می‌شود

// بخش دوم: کرنومتر
let stopwatchInterval;
let elapsedTime = 0;

function formatTime(timeInMilliseconds) {
    const hours = String(Math.floor(timeInMilliseconds / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((timeInMilliseconds % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((timeInMilliseconds % 60000) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

document.getElementById('start').addEventListener('click', () => {
    if (!stopwatchInterval) {
        const startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            document.getElementById('timeDisplay').textContent = `${formatTime(elapsedTime)}:کرنومتر`;
        }, 1000);
    }
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
});

document.getElementById('re').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    document.getElementById('timeDisplay').textContent = 'کرنومتر: 00:00:00';
});

// بخش سوم: بررسی زوج و فرد بودن هفته
const startDate = new Date('1403-07-01'); // تاریخ شروع کلاس‌ها (قابل تنظیم)

function checkWeekStatus() {
    const now = new Date();
    const differenceInDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(differenceInDays / 7) + 1;
    const weekType = weekNumber % 2 === 0 ? 'زوج' : 'فرد';
    document.getElementById('weekchecker').textContent = `وضعیت هفته: ${weekType}`;
}
checkWeekStatus();
