<template>
    <div class="d-flex justify-center w-100 h-100">
        <v-container>
                <v-col cols="6">
                    <v-select
                    v-model = "id_emergency"
                    :items="emergencies.items"
                    :reduce="emergency => emergency.id"
                    :rules="[v => !!v || 'Emergencia requerida']"
                    label="Selecciona Emergencia"
                    prepend-icon="mdi-access-point" 
                    required
                    ></v-select>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="radius"
                        type="number"
                        :counter="10"
                        label="Radio"
                        required
                    ></v-text-field>
                </v-col>
                <v-btn
                    color="success"
                    class="mr-4 mb-5"
                    @click="getVolunteers()">
                    Buscar
                </v-btn>
        <div style="height: 500px; width: 50%">
            <div style="height: 200px overflow: auto;">
            <p>Voluntarios en la emergencia</p>
            </div>
            <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 80%"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
            >
            <l-tile-layer
                :url="url"
                :attribution="attribution"
            />
            <l-marker 
                v-for="volunteer in volunteers"
                :key="volunteer.id"
                :visible="true"
                :lat-lng="[volunteer.latitude, volunteer.longitude]"
                :icon="icon" 
            ></l-marker>
            </l-map>
        </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LIconDefault, LGeoJson  } from "vue2-leaflet";

export default {
    
    data: function(){
        return {
            components: {
                LMap,
                LTileLayer,
                LMarker,
                LPopup,
                LIconDefault,
                LGeoJson
            },
            id_emergency: null,
            emergencies: {
                name: "Emergencias",
                data: null,
                items: [],
            },
            radius: null,
            volunteers: [],
            zoom: 8,
            center: latLng(-38.719, -72.478),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            url_division : 'https://gist.githubusercontent.com/dfao/a8dc40cd822acd2bdc0c707322599539/raw/01ce0385c5f8164e7f983506a94d17c79b7d0789/division_regional.json',
            attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            currentZoom: 5,
            currentCenter: latLng(-38.719, -72.478),
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.5
            },
            showMap: true,
            icon: L.icon({
            iconUrl: require('../../src/assets/placeholder.svg'),
            iconSize: [32, 37],
            iconAnchor: [16, 37]
            }),

        }
    },
    created(){
      this.getEmergencies();
    },
    methods: {
        validate () {
            const validForm = this.$refs.form.validate()
            if(validForm){
            console.log(this.valid);
            this.send();
            }
        },
        defineEmergencies(data){
          this.emergencies.items.push({value: 0, text: 'Selecciona una emergencia'});
          data.forEach(emergency => {
            let emergencyData = {
              value: emergency.id+1,
              text: emergency.nombre
            }
            this.emergencies.items.push(emergencyData);
          });
          console.log(this.emergencies);
        },
        async getEmergencies(){
            let response = await axios.get('http://localhost:8081/emergencies/getAll')
            this.emergencies.data = response.data
            this.defineEmergencies(this.emergencies.data);
        },
        async getVolunteers(){
            let json = {
                "id_emergency": this.id_emergency,
                "radius": this.radius
            }
            await axios.get('http://localhost:8081/getVolunteerByRadius/'+ this.id_emergency + '?radius=' + this.radius, json)
            .then( data=> {
                console.log(data);
              })
            .catch( e=> console.log(e))
        },
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
        },
        showLongText() {
            this.showParagraph = !this.showParagraph;
        },
        innerClick() {
            alert("Click!");
        }
    }

}
</script>

<style>

</style>