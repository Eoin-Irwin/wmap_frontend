/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {


    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        pos();

        //Accessible map
                    var map = '';
                    function pos() {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(showPosition);
                        } else {
                            alert("Geolocation is not supported by this browser.");
                        }
                    }
                    function showPosition(position) {
                        //Set the map view to be the users location
                        //
                        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 14);
                        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(map);

                        var lat;
                        var lng;

                        $.ajax({
                        method: 'GET',
                        url: "http://46.101.134.173:8000/json_all_stations/",
                        data:'json',
                        success: function (bike_data) {
                        alert('lit');
                            for (i in bike_data) {
                            a = bike_data
                            console.log("Position: " + a['0'][i]['fields']['position'])
                            coords = a['0'][i]['fields']['position']
                            var regExp = /\(([^)]+)\)/;
                            var matches = regExp.exec(coords);

                            //matches[1] contains the value between the parentheses
                            splitting = matches[1].split(" ");
                            lng = splitting[0];
                            lat = splitting[1];

                            L.marker([lat,lng]).addTo(map).bindPopup("<hr><b>Number: </b>"+ a['0'][i]['pk'] +"<br><b>Name: </b>" + a['0'][i]['fields']['stand_name'] +
                                "<br><b>Free bikes: </b> " + a['0'][i]['fields']['available_bikes'] + "<hr><b>Total stands: </b>" + a['0'][i]['fields']['total_bike_stands'] +
                                "<hr><b>Free stands: </b> " + a['0'][i]['fields']['available_bike_stands'] + "<hr><b>Updated: </b>" + a['0'][i]['fields']['last_update'] +
                                "<hr><b>Position: </b>" + [lat,lng] + "<hr>" +"<br><button class='btn btn-primary' onclick=route_to_station(" + position.coords.latitude + "," + position.coords.longitude + ","lat "," + lng")>Route to here</button>");
                            }

                            if (x !== '') {
                                                L.Routing.control({
                                                        waypoints: [L.latLng(users_lat_coords, users_lng_coords), L.latLng(x, y)],
                                                        lineOptions: {addWaypoints: false}
                                                    }
                                                ).addTo(map);
                                            }

                                            function route_to_station(users_lat_coords1, users_lng_coords1, x1, y1) {
                                                            users_lat_coords = users_lat_coords1;
                                                            users_lng_coords = users_lng_coords1;
                                                            x = x1;
                                                            y = y1;
                                                            //Set routing to go from the users location to the chosen location
                                                            //
                                                            $("#map-box").html("");
                                                            $("#map-box").html('<div id="map" style ="height: 500px; "></div>');
                                                            pos();
                                                        }
                        },
                        error(){alert("No Stations bro")}
                        });

                        //Change the users marker to a unique red & show users location on click
                        //
                        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("<b>Your location: </b>" + position.coords.latitude + "," + position.coords.longitude);

                    };
        },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();