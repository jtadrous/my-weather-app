<template>
  <div class="home">
    <v-container v-if="weatherData">
      <!--card for weather picture-->
      <v-row justify="center">
        <v-card
          elevation="3"
          md="6"
          class="mt-8 col-9 rounded-xl"
          height="250"
          :img="showImage(weatherData.short_desc)"
        >
        </v-card>
      </v-row>
      <v-row justify="center">
        <!--card for city and temp-->
        <v-card
          elevation="3"
          md="6"
          class="mt-10 mb-10 col-5 rounded-xl"
          height="400"
        >
          <v-card-title
            >{{ weatherData.name }}{{ weatherData.state }} ({{
              weatherData.country
            }})</v-card-title
          >
          <v-subheader class="mt-n7 mx-auto"
            >{{ weatherData.lat }}, {{ weatherData.lon }}</v-subheader
          >
          <v-row class="orange--text accent-2 mt-3 mb-1" justify="center">
            <div>
              <v-col class="d-flex flex-column">
                <h1 class="text-h2 font-weight-medium text-center">
                  {{ weatherData.temp }}
                  {{ weatherData.scale === "imperial" ? "°F" : "°C" }}
                </h1>
                <v-subheader class="text-button"
                  >Feels like {{ weatherData.feels_like }}°</v-subheader
                >
              </v-col>
            </div>
          </v-row>

          <v-row justify="center">
            <div>
              <v-col class="d-flex flex-column text-h4">
                <p>H &nbsp; {{ weatherData.max }}°</p>
                <p class="mt-2">L &nbsp; {{ weatherData.min }}°</p>
              </v-col>
            </div>
          </v-row>
        </v-card>

        <div class="col-4">
          <v-col class="d-flex flex-column">
            <!--card for weather type-->
            <v-card
              elevation="3"
              md="6"
              class="mt-10 ml-5 col-12 rounded-xl"
              color="#826172"
            >
              <v-row class="text-right white--text">
                <v-col class="d-flex flex-column pr-6 pt-4">
                  <h2 class="text-capitalize">{{ weatherData.desc }}</h2>
                  <p>{{ weatherData.clouds }}% cloudy</p>
                  <p v-if="weatherData.rain" class="mt-n4">
                    {{ weatherData.rain["1h"] }}mm rain
                  </p>
                  <p v-if="weatherData.smow" class="mt-n4">
                    {{ weatherData.snow["1h"] }}mm snow
                  </p>
                </v-col>
              </v-row>

              <v-row>
                <v-icon x-large color="#D39558" class="pb-4 pl-6">
                  mdi-notification-clear-all
                </v-icon>
              </v-row>
            </v-card>

            <!--card for wind speed-->
            <v-card
              elevation="3"
              md="6"
              class="mt-10 ml-5 col-12 rounded-xl"
              color="#FEF4D0"
            >
              <h2 class="pl-4 pt-2">Wind Speed</h2>
              <div class="text-center">
                <!-- <div class="triangle-top float-left ma-4">
                  <div class="inner-triangle"><p>hello</p></div>
                </div> -->
                <div class="triangle-top float-left ma-4">
                  <img
                    src="../assets/triangle-outline.png"
                    alt="Simple triangle outline"
                  />
                  <p>hello</p>
                </div>
                <p id="wSpeed">
                  {{ weatherData.wind_speed }} <br />
                  {{ weatherData.scale === "imperial" ? "mph" : "kph" }}
                </p>
                <p>{{ weatherData.wind_dir }}</p>
              </div>
            </v-card>
          </v-col>
        </div>
      </v-row>

      <v-row justify="center">
        <div class="col-4">
          <v-col class="d-flex flex-column">
            <!--card for sunrise and sunset-->
            <v-card
              elevation="3"
              md="6"
              class="mt-3 mr-5 col-12 rounded-xl"
              color="#61BACA"
            >
              <v-row class="text-right">
                <v-col class="d-flex flex-column pr-6 pt-4">
                  <!-- <h2 class="text-capitalize">{{ weatherData.desc }}</h2> -->
                  <h5>Sunrise</h5>
                  <p>{{ weatherData.rise }}</p>
                  <h5>Sunset</h5>
                  <p>{{ weatherData.set }}</p>
                </v-col>
              </v-row>

              <v-row>
                <v-icon x-large color="#FEF4D0" class="pb-4 pl-6">
                  mdi-notification-clear-all
                </v-icon>
              </v-row>
            </v-card>

            <!--card for pressure-->
            <v-card
              elevation="3"
              md="6"
              class="mt-10 mr-5 col-12 rounded-xl white--text"
              color="#595959"
            >
              <h2 class="pl-4 pt-2">Pressure</h2>
              <div class="text-center">
                <p>{{ weatherData.press }} inHg</p>
              </div>
            </v-card>
          </v-col>
        </div>

        <!--card for humidity and visibility-->
        <v-card
          elevation="3"
          md="6"
          class="mt-3 mb-10 col-5 rounded-xl"
          height="400"
        >
          <h1 class="text-h4 pl-4 pt-5 text-decoration-underline">Humidity</h1>
          <v-row class="text-right pt-6 pr-4">
            <v-col class="d-flex flex-column">
              <h1 class="text-h3 font-weight-medium orange--text accent-2">
                {{ weatherData.humid }}%
              </h1>
              <p class="text-button">Sticky</p>
            </v-col>
          </v-row>

          <h1 class="text-h4 pl-4 pt-4 text-decoration-underline">
            Visibility
          </h1>
          <v-row class="text-right pt-6 pr-4">
            <v-col class="d-flex flex-column">
              <h1
                class="text-h3 font-weight-medium text-right orange--text accent-2"
              >
                {{ weatherData.vis }}
              </h1>
              <p class="text-button">Clear</p>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      weather: null,
      photos: {
        Clouds:
          "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/cloud/altocumulus.jpg",
        Clear:
          "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
        Snow: "https://images.unsplash.com/photo-1564260508434-ba6958a4c468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=691&q=80",
        Rain: "https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
        Smoke:
          "https://images.unsplash.com/photo-1613420804475-fef249d0c052?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        Haze: "https://images.unsplash.com/36/STzPBJUsSza3mzUxiplj_DSC09775.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80",
        Mist: "https://images.unsplash.com/photo-1536595334148-996f36a1285d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
        Other:
          "https://images.unsplash.com/photo-1561553475-ff52585fad97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
      },
    };
  },
  props: {
    weatherData: Object,
  },
  methods: {
    showImage(desc) {
      for (var photo in this.photos) {
        if (photo === desc) {
          return this.photos[photo];
        }
      }
      return this.photos["Other"];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";

.home {
  /* .triangle-top {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 60px 120px 60px;
    border-color: transparent transparent #d39558 transparent;
  } */

  .triangle-top {
    width: 50%;
    img {
      width: 90%;
      filter: invert(67%) sepia(48%) saturate(458%) hue-rotate(347deg)
        brightness(85%) contrast(92%);
    }

    p {
      position: absolute;
      background-color: aqua;
      z-index: 3;
      //top: 0;
      //margin-top: -40px;
      align-content: center;
    }
  }

  .inner-triangle {
    position: relative;
    width: 0;
    height: 0;
    left: -48px;
    top: 15px;
    border-style: solid;
    border-width: 0 48px 98px 48px;
    border-color: transparent transparent #fef4d0 transparent;
  }

  #wSpeed {
    position: relative;
    order: -2;
    float: left;
  }
}
</style>
