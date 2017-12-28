<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2017/12/27
 * Time: 14:07
 */

$baseurl = "E:\zys_workspace\wordpress/wp-content/uploads/2017/12/琳琅天上.jpg";
$baseurl =  iconv('UTF-8', 'GB2312', $baseurl);
echo $baseurl."".PHP_EOL;
echo json_encode(getimagesize($baseurl));
?>

