<!doctype html>
<html lang="en">
<head>
  <title>Details</title>
  <style>
	body{background-color:#E1E4E7;
        font-size:0.8em;
        text-align:center;}
  </style>
</head>
<body>
<div> 

<?php


$servername = 'localhost';
$dbname = 'coa123cdb';
$username = 'coa123cycle';
$password = 'bgt87awx';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Requesting user input values
$date1 = $_REQUEST['date_1'];
$date2 = $_REQUEST['date_2'];

// Putting input values into a variable with the correct format for checkdate() function
$date1_check  = explode('/', $date1);
$date2_check  = explode('/', $date2);



// if statement checking if there are 3 values
if(count($date1_check) == 3 && count($date2_check) == 3){

    // if statement checking if the values are numeric is a correct date and the length of values are correct
    if(is_numeric($date1_check[0]) && is_numeric($date1_check[1]) && is_numeric($date1_check[2]) &&
        checkdate($date1_check[1],$date1_check[0],$date1_check[2]) && strlen($date1_check[2])==4
        && strlen($date1_check[0])== 2 && strlen($date1_check[1])== 2){
        if(is_numeric($date2_check[0]) && is_numeric($date2_check[1]) && is_numeric($date2_check[2]) &&
            checkdate($date2_check[1],$date2_check[0],$date2_check[2]&& strlen($date2_check[2])==4
            && strlen($date2_check[0])== 2 && strlen($date2_check[1])== 2)){
            
            // Reordering date to sql format
            $x = 2;
            for($i = 0; $i < 3; $i++){
                $date1_new[$i] = $date1_check[$x];
                $date2_new[$i] = $date2_check[$x];
                $x = $x-1;
            }

            // Joining dates for sql search
            $date1 = implode('/',$date1_new);
            $date2 = implode('/',$date2_new);

            // checking which date is later and setting this as the first date in the between part of the sql statement
            if($date1_check[2]>$date2_check[2] ||
                $date1_check[2]>= $date2_check[2] && $date1_check[1]>$date2_check[1] ||
                $date1_check[2]>=$date2_check[2] && $date1_check[1]>=$date2_check[1] && $date1_check[0]>$date2_check[0]){
                $sql = "SELECT Cyclist.name, Country.country_name, Country.population, Country.gdp FROM `Cyclist` 
                LEFT JOIN Country ON Cyclist.ISO_id = Country.ISO_id WHERE dob BETWEEN '$date2' AND '$date1'";
                
            }
            else{
                $sql = "SELECT Cyclist.name, Country.country_name, Country.population, Country.gdp FROM `Cyclist` 
                        LEFT JOIN Country ON Cyclist.ISO_id = Country.ISO_id WHERE dob BETWEEN '$date1' AND '$date2'";
            }

            
            //storing result
            $result = mysqli_query($conn, $sql);
            
            // Creating array to store result(s)
            $allDataArray = array();
            
            // Storing results in array
            if(mysqli_num_rows($result)>0){
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $allDataArray[] = $row;
                    }
                    
                    // Outputting result in JSON data structure
                echo json_encode($allDataArray);

            }else{
                echo "No matches found between the two dates";
            }

        }else{
            echo 'Error: Date two invalid. Enter date(s) in the format dd/mm/yyyy';
        }
    
    }else{
        if(is_numeric($date2_check[0]) && is_numeric($date2_check[1]) && is_numeric($date2_check[2]) &&
        checkdate($date2_check[1],$date2_check[0],$date2_check[2]&& strlen($date2_check[2])==4)
        && strlen($date2_check[0])== 2 && strlen($date2_check[1])== 2){
        echo 'Error: Date one invalid. Enter date(s) in the format dd/mm/yyyy';
        } else {
        echo 'Error: Error dates invalid. Enter date(s) in the format dd/mm/yyyy';
        }
    }
} else{
    echo 'Error: date input invalid. Enter date(s) in the format dd/mm/yyyy';
}

?>
</body>
</html>