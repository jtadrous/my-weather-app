<template>
  <div id="nav">
    <h2 class="text-center mt-8">uWeather</h2>

    <v-container fluid class="mt-6">
      <!--row 1: search bar-->
      <v-row justify="center" no-gutters>
        <v-col cols="1" class="mt-3">
          <v-icon large color="#D39558"> mdi-weather-night </v-icon>
        </v-col>

        <v-col cols="8">
          <v-form @submit.prevent="getCity">
            <v-text-field
              ref="input"
              class="pl-1 mb-0 pb-0"
              color="#D39558"
              label="Find a city..."
              filled
              v-model.trim="input"
              append-icon="mdi-magnify"
              @click:append="getCity()"
              type:append="submit"
              hint="Ex: Chicago, Paris, etc."
            ></v-text-field>
            <v-subheader
              v-if="!this.validCity"
              class="mt-n4 mx-auto red--text text--lighten-2"
              >City entered was not found. Please enter a valid city
              name.</v-subheader
            >
          </v-form>
        </v-col>
      </v-row>

      <!--row 2: date and temperature toggle-->
      <v-row justify="center" no-gutters>
        <v-col cols="7" align-self="center" class="mt-3">
          <p v-if="this.today" class="grey--text darken-2">
            Local &nbsp;&nbsp; {{ today }}
          </p>
          <p v-if="this.realTime" class="grey--text darken-2">
            {{ weather.name }} &nbsp;&nbsp; {{ weather.real_time }}
          </p>
        </v-col>

        <v-col cols="2" class="pr-4">
          <v-row justify="end">
            <v-switch
              @click="changeScale"
              v-model="switcher"
              inset
              label="Celsius"
              color="#D39558"
            ></v-switch>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navigation",
  emits: ["send-result"],
  data() {
    return {
      input: "",
      inputStore: "",
      switcher: false,
      today: null,
      realTime: null,
      weather: null,
      validCity: true,
      errorMessages: "error",
      scale: "imperial",
    };
  },
  props: {
    world: Array,
  },
  methods: {
    convertDate(dt, type) {
      //var a = new Date(dt * 1000);
      var a = new Date();
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

      if (type === "date") {
        var month = months[a.getMonth()];
        var date = a.getDate();
        var day = days[a.getDay()];
        //var hour1 = new Date(dt).toLocaleTimeString("en-US");
        var hour = a.getHours() - 12;
        var tod = "";

        if (hour < 0) {
          tod = "am";
          hour = Math.abs(hour);
        } else {
          tod = "pm";
        }

        var min = ("0" + a.getMinutes()).slice(-2);
        var time =
          day + " " + month + " " + date + " " + hour + ":" + min + tod;
        return time;
      } else if (type === "sun") {
        var hour2 = new Date(dt * 1000).toLocaleTimeString("en-US");
        return hour2;
      }
    },
    getCity(type) {
      if (type === "scale") {
        this.input = this.inputStore;
      } else if (this.input === "") {
        this.input = "";
        this.validCity = false;
        return;
      }
      this.validCity = true;

      //retrieve weather api data
      axios
        .post(
          `http://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=783e3daeef8a598d9c0cfaa9103beed5&units=${this.scale}`
        )
        .then((result) => {
          console.log(result);
          console.log(result.data.weather[0].main);
          var now = this.convertDate(result.data.dt, "date");
          this.today = now;
          var newNow = this.calcTime(result.data.timezone);
          this.realTime = newNow;

          this.weather = {
            name: result.data.name,
            temp: Math.round(result.data.main.temp),
            clouds: result.data.clouds.all,
            lat: result.data.coord.lat,
            lon: result.data.coord.lon,
            date: now,
            state: this.readFile(result.data.name, "state"),
            feels_like: result.data.main.feels_like,
            humid: result.data.main.humidity,
            press: result.data.main.pressure,
            min: result.data.main.temp_min,
            max: result.data.main.temp_max,
            country: this.readFile(result.data.name, "country"),
            rise: this.convertDate(result.data.sys.sunrise, "sun"), //not correct??
            set: this.convertDate(result.data.sys.sunset, "sun"), //not correct??
            zone: result.data.timezone,
            vis: result.data.visibility,
            desc: result.data.weather[0].description,
            short_desc: result.data.weather[0].main,
            wind_dir: result.data.wind.deg,
            wind_speed: Math.round(result.data.wind.speed),
            wind_gust: result.data.wind.gust,
            real_time: newNow, //not correct??
            rain: result.data.rain,
            snow: result.data.snow,
            scale: this.scale,
          };

          this.$emit("send-result", this.weather);
        })
        .catch((error) => {
          console.error(error);
          this.validCity = false;
          this.$emit("send-result", null);
        });

      this.inputStore = this.input;
      this.input = "";
    },
    readFile(value, type) {
      var json = this.world;
      for (var i = 0; i < json.length; i++) {
        if (json[i].city_ascii == value || json[i].city == value) {
          if (type === "state" && json[i].admin_name != json[i].city) {
            var obj1 = ", " + json[i].admin_name;
            return obj1;
          }
          if (type === "country") {
            var obj2 = json[i].country;
            return obj2;
          }
        }
      }
    },
    calcTime(offset) {
      console.log(offset / 3600);
      // create Date object for current location
      //var d = new Date();

      // get UTC time in msec
      //var utc = d.getTime();

      // create new Date object for different city
      // using supplied offset
      //var nd = new Date(utc + (1000*offset));
      // var d = Date.now() + 1000 * offset; //new Date((new Date().getTime())+(offset)*1000)
      var a = new Date() + offset * 1000;

      // var nd = new Date(d);
      // return time as a string
      var newTime = a.toLocaleString();
      console.log(newTime);
      return newTime;
    },
    changeScale() {
      if (this.switcher === false) {
        this.scale = "imperial";
      } else {
        this.scale = "metric";
      }
      this.getCity("scale");
    },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  //background-color: white;
  margin: 0 auto;
  width: 100%;
}
</style>
