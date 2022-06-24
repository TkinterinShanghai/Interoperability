<?php
class Server
{

	public function __construct()
	{
	}

	function string_converter($obj)
	{
		if (is_array($obj))
			return $obj[0];

		$arr = $obj->string;
		return $arr;
	}


	//uses: String
	//returns: XML
	function query13($attribute)
	{
		$xml1 = simplexml_load_file('xml/1_data.xml');
		$result = $xml1->xpath("//complaint/customer/adress/adress/@$attribute");

		$reponse = new StdClass();
		$reponse->attribute = array();

		foreach ($result as $item) {
			array_push($reponse->attribute, "$item[0]");
		}
		return $reponse;
	}

	//uses: Array(String)
	//returns: XML
	function query14($args_array)
	{
		$args = $this::string_converter($args_array);
		$xml1 = simplexml_load_file('xml/1_data.xml');
		$result = $xml1->xpath("//complaint/customer/adress/adress/street[../../../email[text()='$args']]");
		return (string) $result[0]->name;
	}

	//uses: Date, String
	//returns: XML
	function query21($date, $arg)
	{
		$xml1 = simplexml_load_file('xml/2_data.xml');
		$result = $xml1->xpath("//appointment[@handled='$date']/complaint/$arg");
		return (string) $result[0];
	}

	//uses: ComplexType(Hash(Integer), Hash(String))
	//returns: JSON
	function query22($complextype)
	{
		if (is_array($complextype->id)) {
			$id = $complextype->id['id'];
			$property = $complextype->property["property"];
		} else {
			$property = $complextype->property->property;
			$id = $complextype->id->id;
		}
		$xml1 = simplexml_load_file('xml/2_data.xml');
		$result = $xml1->xpath("//appointment/employee[./id='$id']/$property");
		$response = json_encode($result, JSON_PRETTY_PRINT);
		return $response;
	}

	//uses: Float
	//returns: JSON
	function query23($args)
	{
		$xml1 = simplexml_load_file('xml/2_data.xml');
		$result = $xml1->xpath("//appointment/employee[../@rating='$args']");
		$response = json_encode($result, JSON_PRETTY_PRINT);
		return $response;
	}

	//uses: Array(Integer)
	//returns: JSON
	function query24($array)
	{
		$arr = $this::string_converter($array);
		$res = simplexml_load_file('xml/2_data.xml');
		$result = $res->xpath("//appointment[./complaint/fridgeid[text() = 0]]");
		$response = json_encode($result, JSON_PRETTY_PRINT);
		return $response;
	}

	//uses: Integer, String
	//returns: JSON
	function query33($int, $string)
	{
		$res = simplexml_load_file('xml/3_data.xml');
		// var_dump("//appointment[./complaint/$string[text() = $int]]");
		$result = $res->xpath("//appointment[./customer/@importance < $int]/@$string");
		$response = json_encode($result, JSON_PRETTY_PRINT);
		return $response;
	}

	//uses: Integer, Array(String)
	//returns: JSON
	function query44($array, $integer)
	{
		$arr = $this::string_converter($array);
		$res = simplexml_load_file('xml/4_data.xml');
		var_dump($arr);
		$result = $res->xpath("//facility/repairpart/{$arr}[not(. > ../../../facility/repairpart/$arr)][{$integer}]");
		$response = json_encode($result, JSON_PRETTY_PRINT);
		return $response;
	}
}


// Testing on the Server
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	$test = new Server;
	header('content-type: text/plain');

	$testFunc = 1;
	if (isset($_GET['func']))
		$func = $_GET['func'];

	switch ($testFunc) {
		case 1:
			print_r($test->query13("zip"));
			break;
		case 2:
			print_r($test->query14(array("Maci_Johns@yahoo.com")));
			break;
		case 3:
			print_r($test->query21(date("2021-12-31"), "issuedate"));
			break;
		case 4:
			$complextype = new StdClass();
			$complextype->property = array("property" => "adress", "secondelement" => "some");
			$complextype->id = array("id" => 0, "secondelement" => "second");
			print_r($test->query22($complextype));
			break;
		case 5:
			print_r($test->query23(2.48));
			break;
		case 6:
			print_r($test->query24(array(0)));
			break;
		case 7:
			print_r($test->query33(3, "rating"));
			break;
		case 8:
			print_r($test->query44(array("price"), 1));
			break;
		default:
	}
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	ini_set("soap.wsdl_cache_enabled", "0");
	$server = new SoapServer('jobs.wsdl');
	$server->setClass('Server');
	$server->handle();
	exit;
}
