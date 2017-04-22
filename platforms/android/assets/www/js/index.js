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



                        function httpGet(theUrl)
                        {
                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
                            xmlHttp.send( null );
                            return xmlHttp.responseText;
                        }
                        httpGet('http://46.101.134.173:8000/json_all_stations/');


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