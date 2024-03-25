<!doctype html>
<html lang="en">
<head>
  <title>Athletes</title>
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

$table_search='Cyclist';

// Requesting user input values
$country_id = $_REQUEST['country_id'];
$name = $_REQUEST['part_name'];

// Ctype_alpha if statements validating user input
if (ctype_alpha($country_id) && strlen($country_id) == 3){
  if(ctype_alpha($name)){
    

    $sql="SELECT * FROM $table_search WHERE name LIKE '%$name%' AND ISO_id = '$country_id'";
    
    //storing result from sql query into variable
    $result = mysqli_query($conn, $sql);

    //checking if user input produced results
    if (mysqli_num_rows($result) > 0){
        echo 'Showing results for: Country id - '.$country_id.' and Part Name - '. $name .' <br>';
        echo '<br>';
        echo "<table align = 'center' border = '1'>";
        echo '<tr>';
        echo '<th>'.'Name'.'</th>';
        echo '<th>'.'Gender'.'</th>';
        echo '<th>'.'BMI'.'</th>';
        echo '</tr>';
      
        //looping through each row of result and outputting into table
      while ($row = mysqli_fetch_array($result)){
        $height = $row['height'];
        $weight = $row['weight'];
        $bmi = round($weight/pow($height/100,2),3);

        echo '<tr>';
        echo '<td>'.$row['name'].'</td>';
        echo '<td>'.$row['gender'].'</td>';
        echo '<td>'.$bmi.'</td>';
        echo '</tr>';
      } 
        echo '</table>';
      
    }else{
        echo 'Error: No matches found';
    }
    
  }
  else{
    echo "Error: Part Name Value Invalid";
  }

}else{
  if(ctype_alpha($name)){
    echo "Error: Country id Value Invalid";
  }else{
    echo "Error: Country id and Part Name Value Invalid";
  }
}

?>
</body>
</html>