
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
if(isset($_POST['sort'])){
   //Storing values from jquery in variables for sql query
  $sort = $_POST['sort'];
  $order = $_POST['order'];
}

header('Content-type: application/json');

//Sql query
$sql = "SELECT Country.ISO_id, Country.country_name, Country.bronze, Country.silver, Country.gold,
 Country.total, COUNT(Cyclist.ISO_id) AS \"Cyclist\", AVG(DATEDIFF('2012-01-01',Cyclist.dob)/365) AS \"Average_Age\" FROM Country LEFT JOIN Cyclist ON Cyclist.ISO_id = Country.ISO_id GROUP BY Country.ISO_id ORDER BY $sort $order" ;



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