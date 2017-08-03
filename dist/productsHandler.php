<?php
require_once('Products.php');

function productsData(){

  $setPage = $_POST["setPage"];
  $setPageSize = $_POST["setPageSize"];


  $phone = new Products;
  $setNewPage = $phone->setPage($setPage);
  $setNewPageSize = $phone->setPageSize($setPageSize);
  $result = array();
  $result = $phone->getProducts();


echo json_encode($result);

}

productsData();


?>
