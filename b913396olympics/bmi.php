<?php

$minHeight = 0;
$maxHeight = 0;
$minWeight = 0;
$maxWeight = 0;

// Validating value for min_weight
if(is_numeric($_REQUEST['min_weight']) && $_REQUEST['min_weight'] > 0){
    $minWeight = $_REQUEST['min_weight'];
    echo "Minimum Weight Value: ". $minWeight ."<br>";
}else {
    echo "Error: Minimum Weight Invalid"."<br>";
}

// Validating value for max_weight
if(is_numeric($_REQUEST['max_weight']) && $_REQUEST['max_weight'] >= $minWeight){
    $maxWeight = $_REQUEST['max_weight'];
    echo "Maximum Weight Value: ". $maxWeight ."<br>";
}else {
    echo "Error: Maximum Weight Invalid";
    if($_REQUEST['max_weight'] < $minWeight){
        echo ". Maximum Weight must be greater than Minimum Weight";
    }
    echo "<br>";
}

// Validating value for min_height
if(is_numeric($_REQUEST['min_height']) && $_REQUEST['min_height'] > 0){
    $minHeight = $_REQUEST['min_height'];
    echo "Minimum Height Value: ". $minHeight. "<br>";
}else {
    echo "Error: Minimum Height Invalid"."<br>";
}

// Validating value for max_height
if(is_numeric($_REQUEST['max_height']) && $_REQUEST['max_height'] >= $minHeight){
    $maxHeight = $_REQUEST['max_height'];
    echo "Maximum Height Value: ". $maxHeight. "<br>";
}else {
    echo "Error: Maximum Height Invalid";
    if($_REQUEST['max_height'] < $minHeight){
        echo ". Maximum Height must be greater than Minimum Height";
    }
    echo "<br>";
}

// if all user inputs are validated the table will be made else an error message will be sent
if(is_numeric($_REQUEST['min_weight']) && $_REQUEST['min_weight'] > 0 &&
    is_numeric($_REQUEST['max_weight']) && $_REQUEST['max_weight'] >= $minWeight &&
    is_numeric($_REQUEST['min_height']) && $_REQUEST['min_height'] > 0 &&
    is_numeric($_REQUEST['max_height']) && $_REQUEST['max_height'] >= $minHeight){
        $x=$minWeight;
        echo '<br>';
        echo '<table border = "1">';
        echo '<tr>';
        echo '<th>'."Height ->"."<br>". "Weight <-".'</th>';
        
        // creating Height table header
        for($minHeight;$minHeight<=$maxHeight;$minHeight=$minHeight+5){   
            echo '<th>'.$minHeight.'</th>';}
        echo '</tr>';

        // for loop creating a new table row with weight as a table header for each row
        for($i=$minWeight; $i<= $maxWeight; $i=$i+5){
            
            echo '<tr>';
            echo '<th>'.$x.'</th>';
            
            /*loop within to calculate all bmis for the rows table header weight against all height values,
            calculated bmi stored in the table row as table details*/
            for ($minHeight=$_REQUEST['min_height'];$minHeight<=$maxHeight;$minHeight=$minHeight+5){
                echo '<td>'.round($i/pow($minHeight/100,2),3).'</td>';
            }
            echo '</tr>';
            $x=$x+5;
        }
        echo "</table>";
} else{
    echo "Enter required values (numerical) to view BMI table";
}

?>