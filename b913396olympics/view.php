<html lang="en">
<head>
<link rel = "stylesheet" href = "../b913396olympics/style-view.css">
<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>

<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap" rel="stylesheet">


<script src= "../b913396olympics/script-view.js"></script>

    

<style> 


</style>
<title>view</title>
</head>
<body>
<div class = "navbar">
    <div class = "navContainer">
        <h1 class = "logo"> Olympics Cycling Stats</h1>
        <div>
            <ul> 
                <li><a href = "#"> Home</a></li>
                <li><a href = "#"> Help</a></li>
            </ul>
        </div>
    </div>
</div>

<div class ="form">
    <div class ="formContainer">
                    <!--Form inputs-->
                    <div class = "form_1"> 
                        <label for ="ISO1"> Enter ISO_IDs:</label><br>
                        <input type = "text" placeholder = "e.g. USA" id = "ISO1" name = "ISO1"  pattern = "[A-Za-z] {3,3}" required><br><br>
                        <p class = "error" id = "error1"> </p>
                    </div>
                    <div class = "form_2">   
                        <input type = "text" placeholder = "e.g. GBR" id = "ISO2" name = "ISO2"  pattern = "[A-Za-z] {3,3}" required><br><br>
                        <p class = "error" id = "error2">  </p>
                    </div>
                     
                     <!--Container for form buttons -->
                    <div class = "form_buttons"> 
                        <button id = "submit"> Submit </button>
                        
                        <!--Container for form buttons on line below -->
                        <div class ="below_buttons">
                            <button id = "compareAll"> Compare All Countries</button>
                            <button id = "showCyclists"> View Cyclist List</button>
                        </div>
                    </div> 
    </div>
</div>
    



<div class="main_container">

            <!--Container for two ISO_id comparison and sort menu-->
            <div class = "compare" >
                <div class = "wrapperSort">
                 <!--Container for sort menu-->
                    <div class = "sortMenu" >
                        <a href ="#" class = "menuButton" id = "sort"> Sort</a>
                        <div class = "sortDrop"  id = " compare_sort_drop">
                            <a href = "#" class = "sortButton" id = "countryBar"> Country</a>
                            <a href = "#" class = "sortButton" id = "bronzeBar"> Bronze</a>
                            <a href = "#" class = "sortButton" id = "silverBar"> Silver</a>
                            <a href = "#" class = "sortButton" id = "goldBar"> Gold</a>
                            <a href = "#" class = "sortButton" id = "totalBar"> Total</a>
                            
                        </div>
                    </div> 
                </div>
            
                <!-- insert ISO_id comparison table-->
                <div id = "newContainer"></div>

                
                
                <!-- Cyclist List Container-->
                <div class = "cyclistList">
                
                <!-- insert Cyclist Lists-->
                        <div id = "Cyclists_1"></div>
                        <div id = "Cyclists_2"></div>
                </div>
                
            </div>
            
            
            <div class ="compare_all_container">
                <!-- Sort all cntainer-->
                <div class = "wrapperSortAll">
                    <div class = "sortMenu" id = "sortMenuAll">
                        <a href ="#" class = "menuButton" id = "sortAll"> Sort</a>
                        <div class = "sortDrop"  id = "all_sort_drop">
                            <a href = "#" class = "sortButton" id = "totalAll"> Total</a>
                            <a href = "#" class = "sortButton" id = "goldAll"> Gold</a>
                            <a href = "#" class = "sortButton" id = "cyclistsAll"> Cyclists</a>
                            <a href = "#" class = "sortButton" id = "ageAll"> Age</a>
                        </div>
                    </div> 
                </div>
                <!-- insert all countries table-->
                <div class = table_list_container>
                    <div id = "allTable"></div>
                </div>
            </div>
         
</div>
</body>

</html>