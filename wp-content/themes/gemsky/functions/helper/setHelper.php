<?php
/**
 * Created by PhpStorm.
 * User: ql-qf
 * Date: 2018/1/6
 * Time: 9:55
 */
class helper{
	public static function echo2console($var = ''){
		echo "<script> console.log(". json_encode($var) .")</script>";
	}
}
