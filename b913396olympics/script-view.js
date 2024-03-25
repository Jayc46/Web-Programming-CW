/* Getting table from entered value in input */
$(document).ready(function(){
    $("#submit").click(function(event){
        event.preventDefault();
        $(".form").height("220px");
        $(".formContainer").height("unset");
        $(".wrapperSort").css("display", "block");
        $(".error").html("");
        $("#compareAll").css("visibility", "visible");
        $("#showCyclists").css("visibility", "visible");
        
        // Setting ISO_id input values to uppercase
        var iso1 = $("#ISO1").val().toUpperCase();
        var iso2 = $("#ISO2").val().toUpperCase();
        
        /* Validating ISO_id inputs ensuring they are a string and a length of 3*/
        if(typeof iso1 !== 'string' || iso1.length != 3){
            iso1= "AFG";
            $("#ISO1").val("AFG");
            $("#error1").html("Invalid input: showing results for AFG");
            


        }
        if(typeof iso2 !== 'string' || iso2.length != 3){
            iso2 = "ALB";
            $("#ISO2").val("ALB");
            var error = "Error: Invalid input";
            $("#error2").html("Invalid input: showing results for ALB");
        }
        $.post("compare.php", {ISO_1: iso1, ISO_2: iso2}, function(data){
                
                //Clearing container where table will be stored to avoid duplicates
                $("#newContainer").html("");
                var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">' 
                                +'<th id = "country" >'+  'Country' +'</th>'
                                +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                +'<th id = "silver" >'+  'Silver' +'</th>'
                                +'<th id = "gold" >'+ 'Gold' +'</th>'
                                +'<th id = "total" >'+ 'Total' +'</th>'
                                +'</tr>';
                
            
                /* checking if value entered needs to be changed due to no results from user entered ISO_id and if PHP
                has changed the ISO_id values to default values*/
                
                var count_1 = 0;
                var count_2 = 0;
                for(var i = 0 ; i<data.length; i++){
                    if(data[i].ISO_id != iso1){
                        count_1 += 1;
                        if(count_1 == 2){
                            $("#ISO1").val("AFG");
                            $("#error1").html("No matches, showing results for AFG");
                        }    
                    }
                    if(data[i].ISO_id != iso2){
                        count_2 += 1;
                        if(count_1 == 2){
                            $("#ISO2").val("ALB");
                            $("#error2").html("No matches, showing results for ALB");
                        }    
                    }

                    //converting data from JSON structure to html format table which is inserted into the required div
                    var countryName = data[i].country_name;
                    var bronze = data[i].bronze;
                    var silver = data[i].silver;
                    var gold = data[i].gold;
                    var total = data[i].total;
                    newTable += "<tr class = 'row'>" + 
                                "<td align 'center'>"+ countryName +"</td>"+
                                "<td align 'center'>"+ bronze +"</td>"+
                                "<td align 'center'>"+ silver +"</td>"+
                                "<td align 'center'>"+ gold +"</td>"+
                                "<td align 'center'>"+ total +"</td>"+
                                "</tr>" ;

                    }
            newTable += '</table>';
            $("#newContainer").append(newTable);    
        
        }, "json");    
    });
});


// Sort by total
$(document).ready(function(){
    $("#submit").click(function(){
        /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
        system desired*/
        var i = 0;
        var iso1 = $("#ISO1").val().toUpperCase();
        var iso2 = $("#ISO2").val().toUpperCase();
        $("#totalBar").click(function(event){
            event.preventDefault();

            /* If validation on ISO_id inputs requires them to be changed to the defaults, the if statements will
            change the value of the iso_ids used when sorting the table*/
            if($("#ISO1").val() == "AFG"){
                iso1 = $("#ISO1").val();
            }
            if($("#ISO2").val() == "ALB"){
                iso2 = $("#ISO2").val();
            }
                   
                    
            /* if statement used to select the way the sort value should be ordered by*/
            if(i%2 == 0){
                var order = "DESC";
            } else{
                var order = "ASC";
            }
            i += 1;
            // Passing a variable the value to sort by
            var sort = "Country.total";
            $.post("compare-sort.php", {
                ISO_1: iso1, ISO_2: iso2, sort:sort, order:order}, function(data){
                   
                    //Clearing container where table will be stored to avoid duplicates
                    $("#newContainer").html("");
                    
                    //Creating table header
                    var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">' 
                                    +'<th id = "country" >'+  'Country' +'</th>'
                                    +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                    +'<th id = "silver" >'+  'Silver' +'</th>'
                                    +'<th id = "gold" >'+ 'Gold' +'</th>'
                                    +'<th id = "total" >'+ 'Total' +'</th>'
                                    +'</tr>';
                    
                
                    
                    
                    for(var i = 0 ; i<data.length; i++){

                        //converting data from JSON structure to html format table which is inserted into the required div
                        var countryName = data[i].country_name;
                        var bronze = data[i].bronze;
                        var silver = data[i].silver;
                        var gold = data[i].gold;
                        var total = data[i].total;
                        newTable += "<tr class = 'row'>" + 
                                    "<td align 'center'>"+ countryName +"</td>"+
                                    "<td align 'center'>"+ bronze +"</td>"+
                                    "<td align 'center'>"+ silver +"</td>"+
                                    "<td align 'center'>"+ gold +"</td>"+
                                    "<td align 'center'>"+ total +"</td>"+
                                    "</tr>" ;
                            
                        }
                newTable += '</table>';
                $("#newContainer").append(newTable);
                
            }, "json");    
        });
    });
});

/* Sort by bronze */
$(document).ready(function(){
    
    $("#submit").click(function(){
        /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
        system desired*/
        var i = 0;
        var iso1 = $("#ISO1").val().toUpperCase();
        var iso2 = $("#ISO2").val().toUpperCase();
        $(".wrapperSort").css("display", "block");
        $("#bronzeBar").click(function(event){
            event.preventDefault();

            /* If validation on ISO_id inputs requires them to be changed to the defaults, the if statements will
            change the value of the iso_ids used when sorting the table*/
            if($("#ISO1").val() == "AFG"){
                iso1 = $("#ISO1").val();
            }
            if($("#ISO2").val() == "ALB"){
                iso2 = $("#ISO2").val();
            }
            
            /* if statement used to select the way the sort value should be ordered by*/
            if(i%2 == 0){
                var order = "DESC"; 
            } 
            else{
                var order = "ASC";
            }
            i += 1;

             // Passing a variable the value to sort by
            var sort = "Country.bronze";
            
            $.post("compare-sort.php", {
                ISO_1: iso1, ISO_2: iso2, sort:sort, order:order}, function(data){
                    
                    //Clearing container where table will be stored to avoid duplicates
                    $("#newContainer").html("");

                     //Creating table header
                    var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">' 
                                    +'<th id = "country" >'+  'Country' +'</th>'
                                    +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                    +'<th id = "silver" >'+  'Silver' +'</th>'
                                    +'<th id = "gold" >'+ 'Gold' +'</th>'
                                    +'<th id = "total" >'+ 'Total' +'</th>'
                                    +'</tr>';
                    
                
                    
                    
                    for(var i = 0 ; i<data.length; i++){
                        
                        //converting data from JSON structure to html format table which is inserted into the required div
                        var countryName = data[i].country_name;
                        var bronze = data[i].bronze;
                        var silver = data[i].silver;
                        var gold = data[i].gold;
                        var total = data[i].total;
                        newTable += "<tr class = 'row'>" + 
                                    "<td align 'center'>"+ countryName +"</td>"+
                                    "<td align 'center'>"+ bronze +"</td>"+
                                    "<td align 'center'>"+ silver +"</td>"+
                                    "<td align 'center'>"+ gold +"</td>"+
                                    "<td align 'center'>"+ total +"</td>"+
                                    "</tr>" ;
                            
                        }
                newTable += '</table>';
                $("#newContainer").append(newTable);
                    
            }, "json");   
        });
    });
});

/* Sort by silver */
$(document).ready(function(){
    $("#submit").click(function(){
        /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
        system desired*/
        var i = 0;
        var iso1 = $("#ISO1").val().toUpperCase();
        var iso2 = $("#ISO2").val().toUpperCase();
        $("#silverBar").click(function(event){
            event.preventDefault();

            /* If validation on ISO_id inputs requires them to be changed to the defaults, the if statements will
            change the value of the iso_ids used when sorting the table*/
            if($("#ISO1").val() == "AFG"){
                iso1 = $("#ISO1").val();
            }
            if($("#ISO2").val() == "ALB"){
                iso2 = $("#ISO2").val();
            }
                   
                    
            /* if statement used to select the way the sort value should be ordered by*/
            if(i%2 == 0){
                var order = "DESC";
            } else{
                var order = "ASC";
            }
            i += 1;
            // Passing a variable the value to sort by
            var sort = "Country.silver";
            $.post("compare-sort.php", {
                ISO_1: iso1, ISO_2: iso2, sort:sort, order:order}, function(data){
                   
                    //Clearing container where table will be stored to avoid duplicates
                    $("#newContainer").html("");
                    
                    //Creating table header
                    var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">' 
                                    +'<th id = "country" >'+  'Country' +'</th>'
                                    +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                    +'<th id = "silver" >'+  'Silver' +'</th>'
                                    +'<th id = "gold" >'+ 'Gold' +'</th>'
                                    +'<th id = "total" >'+ 'Total' +'</th>'
                                    +'</tr>';
                    
                
                    
                    
                    for(var i = 0 ; i<data.length; i++){

                        //converting data from JSON structure to html format table which is inserted into the required div
                        var countryName = data[i].country_name;
                        var bronze = data[i].bronze;
                        var silver = data[i].silver;
                        var gold = data[i].gold;
                        var total = data[i].total;
                        newTable += "<tr class = 'row'>" + 
                                    "<td align 'center'>"+ countryName +"</td>"+
                                    "<td align 'center'>"+ bronze +"</td>"+
                                    "<td align 'center'>"+ silver +"</td>"+
                                    "<td align 'center'>"+ gold +"</td>"+
                                    "<td align 'center'>"+ total +"</td>"+
                                    "</tr>" ;
                            
                        }
                newTable += '</table>';
                $("#newContainer").append(newTable);
                
            }, "json");    
        });
    });
});

/* Sort by gold */
$(document).ready(function(){
    $("#submit").click(function(){
        /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
        system desired*/
        var i = 0;
        var iso1 = $("#ISO1").val().toUpperCase();
        var iso2 = $("#ISO2").val().toUpperCase();
        $("#goldBar").click(function(event){
            event.preventDefault();

            /* If validation on ISO_id inputs requires them to be changed to the defaults, the if statements will
            change the value of the iso_ids used when sorting the table*/
            if($("#ISO1").val() == "AFG"){
                iso1 = $("#ISO1").val();
            }
            if($("#ISO2").val() == "ALB"){
                iso2 = $("#ISO2").val();
            }
                   
                    
            /* if statement used to select the way the sort value should be ordered by*/
            if(i%2 == 0){
                var order = "DESC";
            } else{
                var order = "ASC";
            }
            i += 1;
            // Passing a variable the value to sort by
            var sort = "Country.gold";
            $.post("compare-sort.php", {
                ISO_1: iso1, ISO_2: iso2, sort:sort, order:order}, function(data){
                   
                    //Clearing container where table will be stored to avoid duplicates
                    $("#newContainer").html("");
                    
                    //Creating table header
                    var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">' 
                                    +'<th id = "country" >'+  'Country' +'</th>'
                                    +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                    +'<th id = "silver" >'+  'Silver' +'</th>'
                                    +'<th id = "gold" >'+ 'Gold' +'</th>'
                                    +'<th id = "total" >'+ 'Total' +'</th>'
                                    +'</tr>';
                    
                
                    
                    
                    for(var i = 0 ; i<data.length; i++){

                        //converting data from JSON structure to html format table which is inserted into the required div
                        var countryName = data[i].country_name;
                        var bronze = data[i].bronze;
                        var silver = data[i].silver;
                        var gold = data[i].gold;
                        var total = data[i].total;
                        newTable += "<tr class = 'row'>" + 
                                    "<td align 'center'>"+ countryName +"</td>"+
                                    "<td align 'center'>"+ bronze +"</td>"+
                                    "<td align 'center'>"+ silver +"</td>"+
                                    "<td align 'center'>"+ gold +"</td>"+
                                    "<td align 'center'>"+ total +"</td>"+
                                    "</tr>" ;
                            
                        }
                newTable += '</table>';
                $("#newContainer").append(newTable);
                
            }, "json");    
        });
    });
});

/* Sort by country name */
$(document).ready(function(){
    $("#submit").click(function(){
        /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
        system desired*/
       var i = 0;
       var iso1 = $("#ISO1").val().toUpperCase();
       var iso2 = $("#ISO2").val().toUpperCase();
       $("#countryBar").click(function(event){
            event.preventDefault();
            
            /* If validation on ISO_id inputs requires them to be changed to the defaults, the if statements will
            change the value of the iso_ids used when sorting the table*/
            if($("#ISO1").val() == "AFG"){
                iso1 = $("#ISO1").val();
            }
            if($("#ISO2").val() == "ALB"){
                iso2 = $("#ISO2").val();
            }
            
             /* if statement used to select the way the sort value should be ordered by*/
            if(i%2 == 0){
                var order = "DESC";
            } 
            else{
                var order = "ASC";
            }
            i += 1;

            // Passing a variable the value to sort by
            var sort = "Country.country_name";
            $.post("compare-sort.php", {
                ISO_1: iso1, ISO_2: iso2, sort:sort, order:order}, function(data){
                    
                    //Clearing container where table will be stored to avoid duplicates
                    $("#newContainer").html("");

                    //Creating table header
                    var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">' 
                                    +'<th id = "country" >'+  'Country' +'</th>'
                                    +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                    +'<th id = "silver" >'+  'Silver' +'</th>'
                                    +'<th id = "gold" >'+ 'Gold' +'</th>'
                                    +'<th id = "total" >'+ 'Total' +'</th>'
                                    +'</tr>';
                    
                
                    
                    
                    for(var i = 0 ; i<data.length; i++){
                        //converting data from JSON structure to html format table which is inserted into the required div
                        var countryName = data[i].country_name;
                        var bronze = data[i].bronze;
                        var silver = data[i].silver;
                        var gold= data[i].gold;
                        var total = data[i].total;
                        newTable += "<tr class = 'row'>" + 
                                    "<td align 'center'>"+ countryName +"</td>"+
                                    "<td align 'center'>"+ bronze +"</td>"+
                                    "<td align 'center'>"+ silver +"</td>"+
                                    "<td align 'center'>"+ gold +"</td>"+
                                    "<td align 'center'>"+ total +"</td>"+
                                    "</tr>" ;
                            
                        }
                newTable += '</table>';
                $("#newContainer").append(newTable);
              
            }, "json");
            
        });
    });
});

/* Getting cyclists*/
$(document).ready(function(){
    $("#submit").click(function(){
       var iso1 = $("#ISO1").val().toUpperCase();
       var iso2 = $("#ISO2").val().toUpperCase();

        
        $("#showCyclists").click(function(){
            
            /* If validation on ISO_id inputs requires them to be changed to the defaults, the if statements will
            change the value of the iso_ids used when sorting the table*/
            if($("#ISO1").val() == "AFG"){
                iso1 = $("#ISO1").val();
                }
            if($("#ISO2").val() == "ALB"){
                iso2 = $("#ISO2").val();
                }

            //Creating list titles
            var list_1 = iso1+" Cyclists:";
            var list_2 = iso2+" Cyclists:";
            var count_1=0;
            var count_2=0;

            $.post("cyclists.php",{ISO_1: iso1, ISO_2: iso2},function(data){
                //Clearing container where table will be stored to avoid duplicates
                $("#Cyclists_1").html("");
                $("#Cyclists_2").html("");
                
                //Creating list
                list_1 += "<ul>";
                list_2 += "<ul>";


                for(var i = 0; i<data.length; i++){
                    
                    //Adding cyclist names to the list depending on ISO_id
                    if(iso1 == data[i].ISO_id){
                        list_1 += "<li>"+ data[i].name +"</li>";
                        count_1 += 1;
                    }
                    else{
                        list_2 += "<li>"+ data[i].name +"</li>";
                        count_2 += 1;
                    }
                }
                list_1 += "</ul>";
                list_2 += "</ul>";

                if (count_1 == 0){
                   list_1 += "<li>"+ "No cyclists found" +"</li>";
                }
                if (count_2 == 0){
                    list_2 += "<li>"+ "No cyclists found" +"</li>";
                }

                //inserting list into div
                $("#Cyclists_1").append(list_1);
                $("#Cyclists_2").append(list_2);


            }, "json");
        });
    });
});


var iso1 = "";
var iso2 = "";
$(document).ready(function(){
    $("#submit").click(function(){
        

        $("#compareAll").click(function(event){
            event.preventDefault();
            var iso1 = $("#ISO1").val().toUpperCase();
            var iso2 = $("#ISO2").val().toUpperCase();

            $(".wrapperSortAll").css("display", "block");

            /* changes value of iso1 and iso2 if initial entered values had no result*/
            if($("#ISO1").val() == "AFG"){
                    iso1 = $("#ISO1").val();
                }
            if($("#ISO2").val() == "ALB"){
                    iso2 = $("#ISO2").val();
                }

            $.post("countries.php", function(data){

                //Clearing container where table will be stored to avoid duplicates
                $("#allTable").html("");

                //Creating table header
                newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">'
                                +'<th id = "ISO_id" >'+  'ISO_id' +'</th>'
                                +'<th id = "country" >'+  'Country' +'</th>'
                                +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                +'<th id = "silver" >'+  'Silver' +'</th>'
                                +'<th id = "gold" >'+ 'Gold' +'</th>'
                                +'<th id = "total" >'+ 'Total' +'</th>'
                                +'<th id = "cyclists" >'+  'Cyclists' +'</th>'
                                +'<th id = "age" >'+  'Average Age' +'</th>'
                                +'</tr>';
                
                for(var i = 0 ; i<data.length; i++){
                    //converting data from JSON structure to html format table which is inserted into the required div
                    var ISO_id =  data[i].ISO_id
                    var countryName = data[i].country_name;
                    var bronze = data[i].bronze;
                    var silver = data[i].silver;
                    var gold = data[i].gold;
                    var total = data[i].total;
                    var Cyclist = data[i].Cyclist;
                    var Average_Age = parseFloat(data[i].Average_Age).toFixed(2);

                    // Changing data from null to -
                    if(data[i].Average_Age === null){
                        Average_Age = "-";
                    }

                    // To highlight the ISO_ids to be compared to all countries an id has been given which is then styled in css
                    if(ISO_id == iso1 || ISO_id == iso2){
                        newTable += "<tr id = 'highlightRow'>" + 
                            "<td align 'center'>"+ ISO_id +"</td>"+
                            "<td align 'center'>"+ countryName +"</td>"+
                            "<td align 'center'>"+ bronze +"</td>"+
                            "<td align 'center'>"+ silver +"</td>"+
                            "<td align 'center'>"+ gold +"</td>"+
                            "<td align 'center'>"+ total +"</td>"+
                            "<td align 'center'>"+ Cyclist +"</td>"+
                            "<td align 'center'>"+ Average_Age +"</td>"+
                            "</tr>" ;
                    }
                    else{
                        newTable += "<tr id = 'compareRow'>" + 
                            "<td align 'center'>"+ ISO_id +"</td>"+
                            "<td align 'center'>"+ countryName +"</td>"+
                            "<td align 'center'>"+ bronze +"</td>"+
                            "<td align 'center'>"+ silver +"</td>"+
                            "<td align 'center'>"+ gold +"</td>"+
                            "<td align 'center'>"+ total +"</td>"+
                            "<td align 'center'>"+ Cyclist +"</td>"+
                            "<td align 'center'>"+ Average_Age +"</td>"+
                            "</tr>" ;
                     }

                    
                }
                newTable += '</table>';

                //Storing html in the div
                $("#allTable").append(newTable);
            },"json");
        });
    });
});

/* sorting compare all countries by gold*/
    $(document).ready(function(){
        $("#submit").click(function(){
            
            /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
            system desired*/
            var i = 0;
            $("#compareAll").click(function(){
                $("#goldAll").click(function(event){
                    event.preventDefault();
                    var iso1 = $("#ISO1").val().toUpperCase();
                    var iso2 = $("#ISO2").val().toUpperCase();
                    
                    /* changes value of iso1 and iso2 if initial entered values had no result*/
                    if($("#ISO1").val() == "AFG"){
                            iso1 = $("#ISO1").val();
                        }
                    if($("#ISO2").val() == "ALB"){
                            iso2 = $("#ISO2").val();
                        }
                   
                    /* if statement used to select the way the sort value should be ordered by*/
                    if(i%2 == 0){
                        var order = "DESC";
                    } 
                    else{
                        var order = "ASC";
                    }
                    i += 1;

                    // Passing a variable the value to sort by
                    var sort = "Country.gold";
        
                    $.post("countries-sort.php", {sort:sort,order:order},function(data){

                        //Clearing container where table will be stored to avoid duplicates
                        $("#allTable").html("");

                        //Creating header
                        var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">'
                                +'<th id = "ISO_id" >'+  'ISO_id' +'</th>'
                                +'<th id = "country" >'+  'Country' +'</th>'
                                +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                +'<th id = "silver" >'+  'Silver' +'</th>'
                                +'<th id = "gold" >'+ 'Gold' +'</th>'
                                +'<th id = "total" >'+ 'Total' +'</th>'
                                +'<th id = "cyclists" >'+  'Cyclists' +'</th>'
                                +'<th id = "age" >'+  'Average Age' +'</th>'
                                +'</tr>';
                
                        for(var i =0 ; i<data.length; i++){

                            //converting data from JSON structure to html format table which is inserted into the required div
                            var ISO_id =  data[i].ISO_id;
                            var countryName = data[i].country_name;
                            var bronze = data[i].bronze;
                            var silver = data[i].silver;
                            var gold = data[i].gold;
                            var total = data[i].total;
                            var Cyclist = data[i].Cyclist;
                            var Average_Age = parseFloat(data[i].Average_Age).toFixed(2);
                           
                           // Changing data from null to -
                            if(data[i].Average_Age === null){
                            Average_Age = "-";
                            }
                        if(ISO_id == iso1 || ISO_id == iso2){
                             // To highlight the ISO_ids to be compared to all countries an id has been given which is then styled in css
                            newTable += "<tr id = 'highlightRow'>" + 
                                        "<td align 'center'>"+ ISO_id +"</td>"+
                                        "<td align 'center'>"+ countryName +"</td>"+
                                        "<td align 'center'>"+ bronze +"</td>"+
                                        "<td align 'center'>"+ silver +"</td>"+
                                        "<td align 'center'>"+ gold +"</td>"+
                                        "<td align 'center'>"+ total +"</td>"+
                                        "<td align 'center'>"+ Cyclist +"</td>"+
                                        "<td align 'center'>"+ Average_Age +"</td>"+
                                        "</tr>" ;
                        }
                        else{
                            newTable += "<tr id = 'compareRow'>" + 
                                        "<td align 'center'>"+ ISO_id +"</td>"+
                                        "<td align 'center'>"+ countryName +"</td>"+
                                        "<td align 'center'>"+ bronze +"</td>"+
                                        "<td align 'center'>"+ silver +"</td>"+
                                        "<td align 'center'>"+ gold +"</td>"+
                                        "<td align 'center'>"+ total +"</td>"+
                                        "<td align 'center'>"+ Cyclist +"</td>"+
                                        "<td align 'center'>"+ Average_Age +"</td>"+
                                        "</tr>" ;
                            }
                        }
                        newTable += '</table>';

                        //Storing html in the div
                        $("#allTable").append(newTable);

                    },"json");
                });
            });
        });
    });



/* sorting compare all countries by total*/
$(document).ready(function(){
        $("#submit").click(function(){
            
             /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
            system desired*/
            var i = 0;
            $("#compareAll").click(function(){
                $("#totalAll").click(function(event){
                    event.preventDefault();
                    var iso1 = $("#ISO1").val().toUpperCase();
                    var iso2 = $("#ISO2").val().toUpperCase();

                    /* changes value of iso1 and iso2 if initial entered values had no result*/
                    if($("#ISO1").val() == "AFG"){
                        iso1 = $("#ISO1").val();
                    }
                    if($("#ISO2").val() == "ALB"){
                        iso2 = $("#ISO2").val();
                    }
                    
                    /* if statement used to select the way the sort value should be ordered by*/
                    if(i%2 == 0){
                        var order = "DESC";
                    } else{
                        var order = "ASC";
                    }
                    i += 1;

                     // Passing a variable the value to sort by
                    var sort = "Country.total";
                    
                    $.post("countries-sort.php", {sort:sort, order:order},function(data){
                        
                        //Clearing container where table will be stored to avoid duplicates
                        $("#allTable").html("");

                        //Creating header
                        var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">'
                                +'<th id = "ISO_id" >'+  'ISO_id' +'</th>'
                                +'<th id = "country" >'+  'Country' +'</th>'
                                +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                +'<th id = "silver" >'+  'Silver' +'</th>'
                                +'<th id = "gold" >'+ 'Gold' +'</th>'
                                +'<th id = "total" >'+ 'Total' +'</th>'
                                +'<th id = "cyclists" >'+  'Cyclists' +'</th>'
                                +'<th id = "age" >'+  'Average Age' +'</th>'
                                +'</tr>';
                
                        for(var i = 0 ; i<data.length; i++){

                            //converting data from JSON structure to html format table which is inserted into the required div
                            var ISO_id =  data[i].ISO_id;
                            var countryName = data[i].country_name;
                            var bronze = data[i].bronze;
                            var silver = data[i].silver;
                            var gold = data[i].gold;
                            var total = data[i].total;
                            var Cyclist = data[i].Cyclist;
                            var Average_Age = parseFloat(data[i].Average_Age).toFixed(2);

                            // Changing data from null to -
                            if(data[i].Average_Age === null){
                                Average_Age = "-";
                            }


                            if(ISO_id == iso1 || ISO_id == iso2){
                            
                            // To highlight the ISO_ids to be compared to all countries an id has been given which is then styled in css
                                newTable += "<tr id = 'highlightRow'>" + 
                                            "<td align 'center'>"+ ISO_id +"</td>"+
                                            "<td align 'center'>"+ countryName +"</td>"+
                                            "<td align 'center'>"+ bronze +"</td>"+
                                            "<td align 'center'>"+ silver +"</td>"+
                                            "<td align 'center'>"+ gold +"</td>"+
                                            "<td align 'center'>"+ total +"</td>"+
                                            "<td align 'center'>"+ Cyclist +"</td>"+
                                            "<td align 'center'>"+ Average_Age +"</td>"+
                                            "</tr>" ;
                            }
                            else{
                                newTable += "<tr id = 'compareRow'>" + 
                                        "<td align 'center'>"+ ISO_id +"</td>"+
                                        "<td align 'center'>"+ countryName +"</td>"+
                                        "<td align 'center'>"+ bronze +"</td>"+
                                        "<td align 'center'>"+ silver +"</td>"+
                                        "<td align 'center'>"+ gold +"</td>"+
                                        "<td align 'center'>"+ total +"</td>"+
                                        "<td align 'center'>"+ Cyclist +"</td>"+
                                        "<td align 'center'>"+ Average_Age +"</td>"+
                                        "</tr>" ;
                            }
                        }
                        newTable += '</table>';
                        //Storing html in the div
                        $("#allTable").append(newTable);

                    },"json");
                });
            });
        });
    });


/* sorting compare all countries by number of cyclists*/
    $(document).ready(function(){
        $("#submit").click(function(){
            
            /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
            system desired*/
            var i = 0;
            $("#compareAll").click(function(){
                $("#cyclistsAll").click(function(event){
                    event.preventDefault();
                    var iso1 = $("#ISO1").val().toUpperCase();
                    var iso2 = $("#ISO2").val().toUpperCase();
                    
                    /* changes value of iso1 and iso2 if initial entered values had no result*/
                    if($("#ISO1").val() == "AFG"){
                        iso1 = $("#ISO1").val();
                    }
                    if($("#ISO2").val() == "ALB"){
                        iso2 = $("#ISO2").val();
                    }

                    /* if statement used to select the way the sort value should be ordered by*/
                    if(i%2 == 0){
                        var order = "DESC";
                    } 
                    else{
                        var order = "ASC";
                    }
                    i += 1;

                     // Passing a variable the value to sort by
                    var sort = "Cyclist";

                   
                    $.post("countries-sort.php", {sort:sort, order:order},function(data){
                         //Clearing container where table will be stored to avoid duplicates
                        $("#allTable").html("");

                        //Creating header
                        var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">'
                                +'<th id = "ISO_id" >'+  'ISO_id' +'</th>'
                                +'<th id = "country" >'+  'Country' +'</th>'
                                +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                +'<th id = "silver" >'+  'Silver' +'</th>'
                                +'<th id = "gold" >'+ 'Gold' +'</th>'
                                +'<th id = "total" >'+ 'Total' +'</th>'
                                +'<th id = "cyclists" >'+  'Cyclists' +'</th>'
                                +'<th id = "age" >'+  'Average Age' +'</th>'
                                +'</tr>';
                
                        for(var i = 0 ; i<data.length; i++){

                             //converting data from JSON structure to html format table which is inserted into the required div
                            var ISO_id =  data[i].ISO_id;
                            var countryName = data[i].country_name;
                            var bronze = data[i].bronze;
                            var silver = data[i].silver;
                            var gold = data[i].gold;
                            var total = data[i].total;
                            var Cyclist = data[i].Cyclist;
                            var Average_Age = parseFloat(data[i].Average_Age).toFixed(2);

                             // Changing data from null to -
                            if(data[i].Average_Age === null){
                                Average_Age = "-";
                            }
                        
                         // To highlight the ISO_ids to be compared to all countries an id has been given which is then styled in css
                            if(ISO_id == iso1 || ISO_id == iso2){
                                newTable += "<tr id = 'highlightRow'>" + 
                                            "<td align 'center'>"+ ISO_id +"</td>"+
                                            "<td align 'center'>"+ countryName +"</td>"+
                                            "<td align 'center'>"+ bronze +"</td>"+
                                            "<td align 'center'>"+ silver +"</td>"+
                                            "<td align 'center'>"+ gold +"</td>"+
                                            "<td align 'center'>"+ total +"</td>"+
                                            "<td align 'center'>"+ Cyclist +"</td>"+
                                            "<td align 'center'>"+ Average_Age +"</td>"+
                                            "</tr>" ;
                            }
                            else{
                                newTable += "<tr id = 'compareRow'>" + 
                                            "<td align 'center'>"+ ISO_id +"</td>"+
                                            "<td align 'center'>"+ countryName +"</td>"+
                                            "<td align 'center'>"+ bronze +"</td>"+
                                            "<td align 'center'>"+ silver +"</td>"+
                                            "<td align 'center'>"+ gold +"</td>"+
                                            "<td align 'center'>"+ total +"</td>"+
                                            "<td align 'center'>"+ Cyclist +"</td>"+
                                            "<td align 'center'>"+ Average_Age +"</td>"+
                                            "</tr>" ;
                                }
                        }
                        newTable += '</table>';

                        //Storing html in the div
                        $("#allTable").append(newTable);

                    },"json");
                });
            });
        });
    });


/* sorting compare all countries by Average Age*/
$(document).ready(function(){
        $("#submit").click(function(){
             /* i set to zero so if user wants to change countries comparison the sort will be correct to the ranking
            system desired*/
            var i = 0;
            $("#compareAll").click(function(){
                $("#ageAll").click(function(event){
                    event.preventDefault();
                    var iso1 = $("#ISO1").val().toUpperCase();
                    var iso2 = $("#ISO2").val().toUpperCase();

                    /* changes value of iso1 and iso2 if initial entered values had no result*/
                    if($("#ISO1").val() == "AFG"){
                            iso1 = $("#ISO1").val();
                        }
                    if($("#ISO2").val() == "ALB"){
                            iso2 = $("#ISO2").val();
                        }
                    
                    /* if statement used to select the way the sort value should be ordered by*/
                    if(i%2 == 0){
                        var order = "ASC";
                    } 
                    else{
                        var order = "DESC";
                    }
                    i += 1;

                    // Passing a variable the value to sort by
                    var sort = "Average_Age";
                    
                    $.post("countries-sort.php", {sort:sort, order:order},function(data){
                         //Clearing container where table will be stored to avoid duplicates
                         $("#allTable").html("");

                        //Creating header
                        var newTable = '<table id = "newContainer">'+'<tr id = "tableHeader">'
                                +'<th id = "ISO_id" >'+  'ISO_id' +'</th>'
                                +'<th id = "country" >'+  'Country' +'</th>'
                                +'<th id = "bronze" >'+  'Bronze'  +'</th>'
                                +'<th id = "silver" >'+  'Silver' +'</th>'
                                +'<th id = "gold" >'+ 'Gold' +'</th>'
                                +'<th id = "total" >'+ 'Total' +'</th>'
                                +'<th id = "cyclists" >'+  'Cyclists' +'</th>'
                                +'<th id = "age" >'+  'Average Age' +'</th>'
                                +'</tr>';
                
                        for(var i = 0 ; i<data.length; i++){
                             //converting data from JSON structure to html format table which is inserted into the required div
                            var ISO_id =  data[i].ISO_id;
                            var countryName = data[i].country_name;
                            var bronze = data[i].bronze;
                            var silver = data[i].silver;
                            var gold = data[i].gold;
                            var total = data[i].total;
                            var Cyclist = data[i].Cyclist;
                            var Average_Age = parseFloat(data[i].Average_Age).toFixed(2);

                            // Changing data from null to -
                            if(data[i].Average_Age === null){
                                Average_Age = "-";
                            }
                            if(ISO_id == iso1 || ISO_id == iso2){

                                // To highlight the ISO_ids to be compared to all countries an id has been given which is then styled in css
                                newTable += "<tr id = 'highlightRow'>" + 
                                            "<td align 'center'>"+ ISO_id +"</td>"+
                                            "<td align 'center'>"+ countryName +"</td>"+
                                            "<td align 'center'>"+ bronze +"</td>"+
                                            "<td align 'center'>"+ silver +"</td>"+
                                            "<td align 'center'>"+ gold +"</td>"+
                                            "<td align 'center'>"+ total +"</td>"+
                                            "<td align 'center'>"+ Cyclist +"</td>"+
                                            "<td align 'center'>"+ Average_Age +"</td>"+
                                            "</tr>" ;
                            }
                            else{
                                newTable += "<tr id = 'compareRow'>" + 
                                            "<td align 'center'>"+ ISO_id +"</td>"+
                                            "<td align 'center'>"+ countryName +"</td>"+
                                            "<td align 'center'>"+ bronze +"</td>"+
                                            "<td align 'center'>"+ silver +"</td>"+
                                            "<td align 'center'>"+ gold +"</td>"+
                                            "<td align 'center'>"+ total +"</td>"+
                                            "<td align 'center'>"+ Cyclist +"</td>"+
                                            "<td align 'center'>"+ Average_Age +"</td>"+
                                            "</tr>" ;
                            }
                        }
                        newTable += '</table>';

                        //Storing html in the div
                        $("#allTable").append(newTable);

                    },"json");
                });
            });
        });
    });