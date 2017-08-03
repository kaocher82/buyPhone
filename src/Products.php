<?php

class Products
{
    /**
     * @var string
     */
    private $_fileName;

    /**
     * @var int
     */
    private $_pageSize;

    /**
     * @var int
     */
    private $_page;

    /**
     * Products constructor.
     */
    public function __construct()
    {
        $this->_fileName = dirname(__FILE__)
            . DIRECTORY_SEPARATOR . 'data'
            . DIRECTORY_SEPARATOR . 'products.json';
        $this->_pageSize = 3;
        $this->_page = 1;
    }

    /**
     * @param $size
     * @return $this
     */
    public function setPageSize($size)
    {
        $this->_pageSize = (int) $size;
        return $this;
    }

    /**
     * @param $page
     */
    public function setPage($page)
    {
        $this->_page = (int) $page;
    }

    /**
     * @return array
     */
    public function getProducts()
    {
        $productsJson = $this->_getProductJson();
        $products = array();
        $end = $this->_page * $this->_pageSize;
        $start = ($this->_page - 1) * $this->_pageSize;
        if (isset($productsJson['products']) && is_array($productsJson['products'])
            && count($productsJson['products']) >= $start
        ) {
            for (;$start < $end; $start++) {
                if (!isset($productsJson['products'][$start])) {
                    break;
                }
                array_push($products, $productsJson['products'][$start]);
            }
        }
        return $products;
    }

    /**
     * @return mixed
     */
    protected function _getProductJson()
    {
        $fileText = file_get_contents($this->_fileName);
        return json_decode($fileText, true);
    }


}


?>
