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
$profilePictureUrl = $_POST['profilePictureUrl'];

$result = $db -> query("INSERT IGNORE INTO fblogin(name, profilePictureUrl) VALUES ('$name', '$profilePictureUrl')");

?>