
<?php

//varaiable values to connect to mysql are stored in view-sql-connect.php
include "view-sql-connect.php"; 

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

//isset() ensures the variable is set and is not null
if(isset($_POST['ISO_1'])){
  //Storing ISO_id values from user input in variable
  $ISO_1 = $_POST["ISO_1"];
  $ISO_2 = $_POST["ISO_2"];
    
}
else{
  $ISO_1 = 'AFG';
  $ISO_2 = 'ALB';
}


header('Content-type: application/json');

//Sql query
$sql="SELECT * FROM Cyclist WHERE ISO_id = '$ISO_1' OR ISO_id = '$ISO_2'";
$result = mysqli_query($conn, $sql);

//Array to store query result
$allDataArray = array();

//Storing each row from result in the array
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
   $allDataArray[] = $row;
}

//Changing data to JSON data structure
$value = json_encode($allDataArray);

//Echoing the JSON data structure so the ajax request can use the data
echo $value;
?>