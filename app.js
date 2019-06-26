$(document).ready(function(){
$('body').append("Jquery wprking");
console.log("working")
$('.searchButton').on("click",function(){
event.preventDefault();
var searchFor=$('.searchBox').val().toLowerCase();
//if the user searches a type
    if (searchFor=="water"||searchFor=="fire"||searchFor=="grass"||searchFor=="electric"||searchFor=="psychic"||searchFor=="ice"||searchFor=="ice"||searchFor=="dragon"||searchFor=="dark"||searchFor=="fairy"||searchFor=="normal"||searchFor=="fighting"||searchFor=="flying"||searchFor=="poison"||searchFor=="ground"||searchFor=="rock"||searchFor=="bug"||searchFor=="ghost"||searchFor=="steel"){
    console.log("type searched")
    $.ajax({
            url:`https://pokeapi.co/api/v2/type/${searchFor}`,
            success:(data)=>{
                console.log(data)
                $('body').append(data.sprites.front_default)
            },
            error:()=>{
                console.log("bad request")
            }
    })
    //if the user searches a name
    }else{

    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${searchFor}`,
        success:(data)=>{
            console.log(data)
        },
        error:()=>{
            console.log("bad request")
        }

    })}
    })


})