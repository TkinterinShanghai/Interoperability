<?php
  $curl_handle = curl_init();
  curl_setopt($curl_handle, CURLOPT_URL, "https://cpee.org/flow/start/xml/");
  curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl_handle, CURLOPT_POST, true);
  $start = '------'."\r\n".'Content-Disposition: form-data; name="behavior"'."\r\n\r\n".'fork_ready'."\r\n".'------'."\r\n".'Content-Disposition: form-data; name="xml"'."\r\n".'Content-Type: text/xml'."\r\n\r\n";
  $xml = '<testset xmlns="http://cpee.org/ns/properties/2.0">  <executionhandler>ruby</executionhandler>  <dataelements/>  <endpoints>    <timeout>http://cpee.org/services/timeout.php</timeout>    <subprocess>https-post://cpee.org/flow/start/url/</subprocess>    <send>https-post://cpee.org/ing/correlators/message/send/</send>    <receive>https-get://cpee.org/ing/correlators/message/receive/</receive>    <user>https-post://cpee.org/services/timeout-user.php</user>    <auto>https-post://cpee.org/services/timeout-auto.php</auto>  </endpoints>  <attributes>    <info>Enter info here</info>    <modeltype>CPEE</modeltype>    <theme>preset</theme>  </attributes>  <description>    <description xmlns="http://cpee.org/ns/description/1.0"/></description>  <transformation>    <description type="copy"/>    <dataelements type="none"/>    <endpoints type="none"/>  </transformation></testset>';
  $end = "\r\n".'------'."\r\n"; 
  $body = '';
  $body .= $start.$xml.$end;
  //var_dump($body);
  //curl_setopt($curl_handle, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data;boundary=----','Content-Length: '.strlen($body)));
  curl_setopt($curl_handle, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data;boundary=----'));
  curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $body);
  $result = curl_exec($curl_handle);
  if(curl_error($curl_handle)) {
    print(curl_error($curl_handle));
  }
  else {
    var_dump($result);
  }
  curl_close($curl_handle);
?>