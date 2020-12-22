
//API urlen 
const url = 'https://restcountries.eu/rest/v2/all';
// API anrop
fetch(url).then(
    function(response){
        return response.json();
    }
).then(
    function(data){
        // Skapar en tom array för att store våra random länder 
        let countries = [];
        // Loop för att få fram 3 random länder varje gång
        for (let i=0; i<3; i++){
        let rand = Math.floor(Math.random() * data.length)
        // Variabel med egenskaper vi vill ha med i vårt random land 
        let country = new Country (data[rand].flag, data[rand].name, data[rand].timezones[0]);
        // Adderar våra random länder till vår tomma array 
        countries.push(country);
        }
// För att få våra länder att visas i webbläsaren 

// DOM-Selectar element
    let flag = document.querySelectorAll('img');
    let name = document.querySelectorAll('h1');
    let time= document.querySelectorAll('h3');
// För varje random land vill vi displaya följande infon
    for (let i = 0; i<countries.length; i++){
        flag[i].src = countries[i].img;
        name[i].innerText = countries[i].name;
        time[i].innerText = `För tillfället är klockan i ${countries[i].name} ${countries[i].showTime()}`;
}
}
)
// Konstruktorn för ett land
function Country(_flag,_name,_timezone){
    this.img = _flag;
    this.name = _name;
    this.timezone = _timezone;

}
//Protortpe-function för att visa tiden för respektive land 
Country.prototype.showTime = function(){
    let timeNow = new Date;
    let hour = timeNow.getUTCHours();
    let minuts = timeNow.getMinutes();
    //GetMinutes ger antalet minuter
    //Snygga till med 0 framför vid en-tal 
    if(minuts<10){
        minuts = '0' + minuts;}
        else {
            minuts = minuts + ''; 
    }
    let displayTime = Number((this.timezone).substr(3,3));
    //console.log(this.timezone); Returnerar hur många timmar från 0 tidzonen landet ligger i 
    let currentTime = `${displayTime + hour}:${minuts}`; //Ger hela landets tid i rätt format
    return currentTime;
}