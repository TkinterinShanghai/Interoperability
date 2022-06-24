<?php


ini_set("soap.wsdl_cache_enabled","0");
$client = new SoapClient('http://wwwlab.cs.univie.ac.at/~wetzelt95/iop/jobs.wsdl',array('trace'=>1));

header('content-type: text/plain');

// 1
$client->query13("zip");
printXML("Query13");

// 2
$client->query14(array("Maci_Johns@yahoo.com"));
printXML("Query14");

// 3
$client->query21(date("2021-12-31"), "issuedate");
printXML("Query21");

// 4
$complextype = new StdClass();
$complextype->property = array("property" => "adress", "secondelement" => "some");
$complextype->id = array("id" => 0, "secondelement" => "second");
$response = $client->query22($complextype);
printJSON("Query22", $response);

// 5
$response = $client->query23(2.48);
printJSON("Query23", $response);

// 6
$response = $client->query24(Array(0,1));
printJSON("Query24", $response);

// 7
$response = $client->query33(3,"rating");
printJSON("Query33", $response);

// 8
$response = $client->query44(array("price"), 1);
printJSON("Query44", $response);

// helpers
function printXML($name){
  global $client;
  print $name;
  print "\n\n";
  $doc = new DOMDocument('1.0');
  $doc->formatOutput = true;
  $doc->loadXML($client->__getLastResponse());
  print $doc->saveXML();
  print "\n\n\n";
}

function printJSON($name, $response){
	global $client;
	print $name;
	print "\n\n";
	header('content-type: application/json');
	print_r($response);
	print "\n\n\n";
}

?>