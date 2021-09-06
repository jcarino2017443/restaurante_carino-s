"use strict"
;(function () {

    class UseLocation{
        static get(callback){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((location)=>{
                    callback({
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    })
                })
            }else{
                alert("Tu navegador no soporta geocalizacion")
                
            }
            
        }
    }

    const my_place = {
        lat: 14.5603595,
        lng: -90.5656119
    }

    google.maps.event.addDomListener(window, "load",()=>{
        const map = new google.maps.Map(
            document.getElementById('map'),{
                zoom:15,
                center: my_place
            })
        const marker = new google.maps.Marker({
            map: map,
            position: my_place,
            title: "Restaurante Carinos",
            visible:true
        })
        
        }) 
            UseLocation.get((coordenadas)=>{
                //calcular distancia del restaurante al usuario
                let origen = new google.maps.LatLng(coordenadas.lat, coordenadas.lng) //LatLng
                let destino = new google.maps.LatLng(my_place.lat, my_place.lng) ;
                let service = new google.maps.DistanceMatrixService()
                service.getDistanceMatrix({
                    origins: [origen],
                    destinations: [destino],
                    travelMode: google.maps.TravelMode.DRIVING
                },(response, status)=>{
                    if(status === google.maps.DistanceMatrixStatus.OK){
                        const duration_element = response.row[0].element[0]
                        const duracion_viaje = duration_element.duration.text
                        document.querySelector("#message")
                        console.log(duration_element)
                            .innerHTML = `Estas ${duracion_viaje} de una noche inolvidable
                            <span class="whitetext_tittle">Restaurante Carinos</span>`
                    }
                })
            })
    
})()