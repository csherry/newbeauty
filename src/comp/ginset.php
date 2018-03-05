<?php 
header("Access-Control-Allow-Origin:*");
$servername = "testing.sherrychenxy.com";
$dblogin = "sherr516_wp91";
$password = "12345qwert";
$dbname= "sherr516_beautytwin";

try{
    $db = new PDO ("mysql:host=$servername; dbname=$dbname", $dblogin, $password);
} catch(PDOException $e){
    echo $e -> getMessage();
}

$name = $_POST['name'];

$result = $db -> query("INSERT IGNORE INTO gmaillogin(name) VALUES ('$name')");

?>