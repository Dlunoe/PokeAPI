$(document).ready(function(){
let pokemon=[];
let pageNumber=1;
let teamCount=0;
function addTeam () {
    if(teamCount<6){
        $('.team-container').append($('.sprite').html())
        teamCount++;
    }else{
        alert("Your party is full, please remove a pokemon to add more.")
    }
}
$('.addToTeam').click(function(){
    addTeam();
})
$('.team-container').on("click", function(){
    console.log(this)
    $(event.target).remove();
    teamCount--;
})
$('form').on("submit",function(){
    event.preventDefault();
    $('.searchResults').empty();
    var searchFor=$('.searchBox').val().toLowerCase();
    //if the user searches a type
    if (searchFor=="water"||searchFor=="fire"||searchFor=="grass"||searchFor=="electric"||searchFor=="psychic"||searchFor=="ice"||searchFor=="ice"||searchFor=="dragon"||searchFor=="dark"||searchFor=="fairy"||searchFor=="normal"||searchFor=="fighting"||searchFor=="flying"||searchFor=="poison"||searchFor=="ground"||searchFor=="rock"||searchFor=="bug"||searchFor=="ghost"||searchFor=="steel"){
        console.log("type searched")
        $.ajax({
        url:`https://pokeapi.co/api/v2/type/${searchFor}`,
        success:(data)=>{
            console.log(data)
            pokemon=data.pokemon;
            //appends search results as buttons
            $('.searchResults').append('<input type="button" value="Previous Page" class="previousButton"></input>')
            $('.searchResults').append('<input type="button" value="Next Page" class="nextButton"></input>')
            for(i=0;i<20;i++){
            
            $('.searchResults').append(`<li><input type="button" class="search" value="${pokemon[i].pokemon.name}"></input></li>`)
            }
            
            $('.nextButton').on("click", function(e){
                $('.searchResults li').empty();
               
                pageNumber++;
               //clicking next will bring up the next 20 results
                for(i=(pageNumber-1)*20;i<((pageNumber-1)*20+20)+1;i++){                   
                    $('.searchResults').append(`<li><input type="button" class="search" value="${pokemon[i].pokemon.name}"></input></li>`)
                    }
                        $('.search').on("click", function(e){
                        event.preventDefault();
                        console.log(this)
                        searchFor=(this.value);
                                $.ajax({
                                url:`https://pokeapi.co/api/v2/pokemon/${searchFor}`,
                                success:(data)=>{
                                    console.log(data);
                                    var sprite=data.sprites.front_default;
                                    var spriteBack=data.sprites.back_default;
                                    $('.name').text(data.species.name)
                                    $('.sprite').html(`<img src=${sprite}>`)
                                    $('.sprite2').html(`<img src=${spriteBack}>`)
                                    $('.types').empty();
                                    $('.types').append(`<li>${data.types[0].type.name}</li>`)
                                        if(data.types[1].type.name!==undefined){
                                        $('.types').append(`<li>${data.types[1].type.name}</li>`)
                                        }
                                    
                                    
                                },
                                error:()=>{
                                    console.log("bad request")
                                }
                        
                                })
                                $.ajax({
                                url:`https://pokeapi.co/api/v2/pokemon-species/${searchFor}`,
                                success:(data)=>{
                                    console.log(data)
                                    var flavorText = "";
                                    for(i=0;i<data.flavor_text_entries.length;i++){
                                        if(data.flavor_text_entries[i].language.name=="en"){
                                            flavorText=data.flavor_text_entries[i].flavor_text;
                                            $('.flavorText').text(flavorText);
                                            return true
                                        }
                                    }
                                },
                                error:()=>{
                                    console.log("bad request")
                                }
                                })
                        
        
                        })
            })
            $('.previousButton').on("click", function(e){
                if(pageNumber>1){
                $('.searchResults li').empty();
                pageNumber--;
               //clicking next will bring up the previous 20 results
                for(i=(pageNumber-1)*20;i<((pageNumber-1)*20+20)+1;i++){                   
                    $('.searchResults').append(`<li><input type="button" class="search" value="${pokemon[i].pokemon.name}"></input></li>`)
                    }
                       $('.search').on("click", function(e){
                        event.preventDefault();
                        console.log(this)
                        searchFor=(this.value);
                                $.ajax({
                                url:`https://pokeapi.co/api/v2/pokemon/${searchFor}`,
                                success:(data)=>{
                                    console.log(data);
                                    var sprite=data.sprites.front_default;
                                    var spriteBack=data.sprites.back_default;
                                    $('.name').text(data.species.name)
                                    $('.sprite').html(`<img src=${sprite}>`)
                                    $('.sprite2').html(`<img src=${spriteBack}>`)
                                    $('.types').empty();
                                    $('.types').append(`<li>${data.types[0].type.name}</li>`)
                                        if(data.types[1].type.name!==undefined){
                                        $('.types').append(`<li>${data.types[1].type.name}</li>`)
                                        }
                                    
                                   
                                },
                                error:()=>{
                                    console.log("bad request")
                                }
                        
                                })
                                $.ajax({
                                url:`https://pokeapi.co/api/v2/pokemon-species/${searchFor}`,
                                success:(data)=>{
                                    console.log(data)
                                    var flavorText = "";
                                    for(i=0;i<data.flavor_text_entries.length;i++){
                                        if(data.flavor_text_entries[i].language.name=="en"){
                                            flavorText=data.flavor_text_entries[i].flavor_text;
                                            $('.flavorText').text(flavorText);
                                            return true
                                        }
                                    }
                                },
                                error:()=>{
                                    console.log("bad request")
                                }
                                })
                        
        
                       })
                    }
            })
            //same code as seaching for a name, but uses the button to input a name instead of a search box.
            $('.search').on("click", function(e){
                event.preventDefault();
                console.log(this)
                searchFor=(this.value);
                        $.ajax({
                        url:`https://pokeapi.co/api/v2/pokemon/${searchFor}`,
                        success:(data)=>{
                            console.log(data);
                            var sprite=data.sprites.front_default;
                            var spriteBack=data.sprites.back_default;
                            $('.name').text(data.species.name)
                            $('.sprite').html(`<img src=${sprite}>`)
                            $('.sprite2').html(`<img src=${spriteBack}>`)
                            $('.types').empty();
                            $('.types').append(`<li>${data.types[0].type.name}</li>`)
                                if(data.types[1].type.name!==undefined){
                                $('.types').append(`<li>${data.types[1].type.name}</li>`)
                                }
                            
                        },
                        error:()=>{
                            console.log("bad request")
                        }
                
                        })
                        $.ajax({
                        url:`https://pokeapi.co/api/v2/pokemon-species/${searchFor}`,
                        success:(data)=>{
                            console.log(data)
                            var flavorText = "";
                            for(i=0;i<data.flavor_text_entries.length;i++){
                                if(data.flavor_text_entries[i].language.name=="en"){
                                    flavorText=data.flavor_text_entries[i].flavor_text;
                                    $('.flavorText').text(flavorText);
                                    return true
                                }
                            }
                        },
                        error:()=>{
                            console.log("bad request")
                        }
                        })
                

            })
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
            console.log(data);
            var sprite=data.sprites.front_default;
            var spriteBack=data.sprites.back_default;
            $('.name').text(data.species.name)
            $('.sprite').html(`<img src=${sprite}>`)
            $('.sprite2').html(`<img src=${spriteBack}>`)
            $('.types').empty();
            $('.types').append(`<li>${data.types[0].type.name}</li>`)
                if(data.types[1].type.name!==undefined){
                $('.types').append(`<li>${data.types[1].type.name}</li>`)
                }
           
           
        },
        error:()=>{
            console.log("bad request")
        }

    })
    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon-species/${searchFor}`,
        success:(data)=>{
            console.log(data)
            var flavorText = "";
            for(i=0;i<data.flavor_text_entries.length;i++){
                if(data.flavor_text_entries[i].language.name=="en"){
                    flavorText=data.flavor_text_entries[i].flavor_text;
                    $('.flavorText').text(flavorText);
                    return true
                }
            }
        },
        error:()=>{
            console.log("bad request")
        }
    })
}
    
    })


})